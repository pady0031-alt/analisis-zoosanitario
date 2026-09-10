import urllib.request
import json
import re
from datetime import datetime

API_URL = "https://www.sevilla.org/ConsultasWeb/ServicioREST.aspx"
BASE_PHOTO_URL = "https://www.sevilla.org/ConsultasWeb/"

ESPECIE_MAP = {
    "PERROS": "Perro",
    "GATOS": "Gato",
    "EQUINOS": "Caballo",
    "AVES": "Ave"
}

def normalizar_sexo(sexo_raw):
    if not sexo_raw:
        return "Desconocido"
    s = str(sexo_raw).strip().upper()
    if "MACHO" in s:
        return "Macho"
    if "HEMBRA" in s:
        return "Hembra"
    return "Desconocido"

def extraer_nombre(identificacion, referencia):
    """
    Intenta deducir si hay un nombre propio en la identificación,
    o utiliza la referencia oficial como identificador reconocible.
    """
    if not identificacion:
        return f"Animal {referencia}"
    
    # Buscar patrones como "LLAMADO LUNA", "SE LLAMA TOBY", "NOMBRE: KIRA"
    match = re.search(r'(?:llamado|llamada|se llama|nombre[:\s]+)\s*([A-Za-zÁÉÍÓÚáéíóúñÑ]+)', identificacion, re.IGNORECASE)
    if match:
        nombre = match.group(1).strip().capitalize()
        return f"{nombre} ({referencia})"
        
    return f"Ref: {referencia}"

def descargar_consulta(id_consulta):
    print(f"-> Conectando con Servicio REST del Ayuntamiento: {id_consulta}...")
    body = {
        "idConsulta": id_consulta,
        "parametros": None,
        "valores": None,
        "incluirItems": True,
        "incluirInfoValoresYParametros": True
    }
    
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0 (ZoosanitarioSevilla/2.0)"
        }
    )
    
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            items = data.get("Items", []) or data.get("items", [])
            print(f"   ✓ Éxito: {len(items)} registros obtenidos para {id_consulta}")
            return items
    except Exception as e:
        print(f"   ✗ Error en {id_consulta}: {e}")
        return []

def extraer_chip(identificacion):
    if not identificacion:
        return ""
    # Buscar números de microchip (normalmente de 10 a 15 dígitos)
    match = re.search(r'\b\d{10,15}\b', identificacion)
    if match:
        return match.group(0)
    if "CON CHIP" in identificacion.upper() or "TIENE CHIP" in identificacion.upper():
        return "Con chip (sin nº especificado)"
    return ""

def procesar_todos():
    consultas = [
        {"id": "ADOP_PERD", "estado": "perdido", "label": "Perdidos"},
        {"id": "ADOP_02", "estado": "adoptable", "label": "Adoptables"},
        {"id": "ADOP_05", "estado": "adoptado", "label": "Adoptados"}
    ]
    
    todos_los_animales = []
    totales = {"perdido": 0, "adoptable": 0, "adoptado": 0}
    
    for c in consultas:
        raw_items = descargar_consulta(c["id"])
        estado_dest = c["estado"]
        
        for item in raw_items:
            referencia = str(item.get("REFERENCIA") or item.get("NUMERO_ING") or "S/R").strip()
            identificacion = str(item.get("IDENTIFICACION_ING") or "").strip()
            
            # Especie
            esp_raw = str(item.get("NOMBRE_ESP") or "").strip().upper()
            especie = ESPECIE_MAP.get(esp_raw, "Otro")
            
            # Raza
            raza = str(item.get("NOMBRE_RAZA") or "Mestizo").strip().title()
            
            # Sexo
            sexo = normalizar_sexo(item.get("SEXO"))
            
            # Fecha (ingreso o adopción)
            fecha_raw = item.get("FECHA_ADOP") if estado_dest == "adoptado" and item.get("FECHA_ADOP") else item.get("FECHA_ING")
            fecha = ""
            if fecha_raw:
                fecha = str(fecha_raw).split("T")[0]
            if not fecha:
                fecha = datetime.now().strftime("%Y-%m-%d")
                
            # Foto
            foto_rel = item.get("Foto")
            foto_url = f"{BASE_PHOTO_URL}{foto_rel}" if foto_rel else ""
            
            # Chip
            chip = extraer_chip(identificacion)
            
            # Color / Rasgos
            color = ""
            colores_posibles = ["negro", "blanco", "marrón", "canela", "atigrado", "gris", "fuego", "crema", "rubio", "tricolor"]
            for col in colores_posibles:
                if col in identificacion.lower():
                    color = col.capitalize()
                    break
                    
            # Nombre
            nombre = extraer_nombre(identificacion, referencia)
            
            # Observaciones
            obs_partes = []
            edad = item.get("EDAD")
            if edad and str(edad).upper() != "SIN DATOS":
                obs_partes.append(f"Edad: {edad}")
            if identificacion:
                obs_partes.append(identificacion)
            observaciones = " | ".join(obs_partes)
            
            animal = {
                "id": f"sevilla_{referencia.replace('/', '_')}_{estado_dest}",
                "referencia": referencia,
                "nombre": nombre,
                "especie": especie,
                "raza": raza,
                "sexo": sexo,
                "color": color,
                "chip": chip,
                "fecha": fecha,
                "observaciones": observaciones,
                "fotoUrl": foto_url,
                "estado": estado_dest
            }
            
            todos_los_animales.append(animal)
            totales[estado_dest] += 1

    # Guardar archivo consolidado
    output_filename = "datos_ayuntamiento.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(todos_los_animales, f, ensure_ascii=False, indent=2)
        
    print("\n" + "="*50)
    print(f"¡Sincronización finalizada con éxito!")
    print(f"  - Animales Perdidos:   {totales['perdido']}")
    print(f"  - Animales Adoptables: {totales['adoptable']}")
    print(f"  - Animales Adoptados:  {totales['adoptado']}")
    print(f"  - TOTAL REGISTROS:     {len(todos_los_animales)}")
    print(f"Datos exportados a: {output_filename}")
    print("="*50)
    return todos_los_animales

if __name__ == "__main__":
    procesar_todos()
