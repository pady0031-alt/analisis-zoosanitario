/**
 * app.js - Aplicación de Análisis Zoosanitario
 * Gestiona animales perdidos, adoptables y adoptados.
 */

const STORAGE_KEY = 'zoosanitario_animales';

// Datos de ejemplo realistas para Sevilla
const DUMMY_DATA = [
  // Perdidos
  { id: '1', nombre: 'Luna', especie: 'Perro', raza: 'Mestizo', sexo: 'Hembra', color: 'Canela', chip: '123456789012345', fecha: '2025-01-15', observaciones: 'Perdida por Triana', fotoUrl: '', estado: 'perdido' },
  { id: '2', nombre: 'Toby', especie: 'Perro', raza: 'Bodeguero', sexo: 'Macho', color: 'Blanco y negro', chip: '', fecha: '2025-02-10', observaciones: 'Llevaba collar azul', fotoUrl: '', estado: 'perdido' },
  { id: '3', nombre: 'Simba', especie: 'Gato', raza: 'Común Europeo', sexo: 'Macho', color: 'Naranja tabby', chip: '987654321098765', fecha: '2025-03-05', observaciones: 'Muy asustadizo', fotoUrl: '', estado: 'perdido' },
  { id: '4', nombre: 'Kira', especie: 'Perro', raza: 'Pastor Alemán', sexo: 'Hembra', color: 'Negro y fuego', chip: '111222333444555', fecha: '2025-04-20', observaciones: 'Perdida en el Parque Alamillo', fotoUrl: '', estado: 'perdido' },
  { id: '5', nombre: 'Mía', especie: 'Gato', raza: 'Siamés', sexo: 'Hembra', color: 'Crema y marrón', chip: '', fecha: '2025-05-12', observaciones: 'Ojos azules muy claros', fotoUrl: '', estado: 'perdido' },
  { id: '6', nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog Francés', sexo: 'Macho', color: 'Negro', chip: '555666777888999', fecha: '2025-06-01', observaciones: 'Necesita medicación', fotoUrl: '', estado: 'perdido' },
  { id: '7', nombre: 'Nala', especie: 'Perro', raza: 'Galgo', sexo: 'Hembra', color: 'Atigrado', chip: '123123123123123', fecha: '2025-06-15', observaciones: 'Cicatriz en pata delantera', fotoUrl: '', estado: 'perdido' },
  { id: '8', nombre: 'Coco', especie: 'Loro', raza: 'Yaco', sexo: 'Desconocido', color: 'Gris y rojo', chip: '', fecha: '2025-07-10', observaciones: 'Habla mucho', fotoUrl: '', estado: 'perdido' },
  { id: '9', nombre: 'Thor', especie: 'Perro', raza: 'Podenco', sexo: 'Macho', color: 'Canela y blanco', chip: '999888777666555', fecha: '2025-07-25', observaciones: 'Llevaba arnés rojo', fotoUrl: '', estado: 'perdido' },
  { id: '10', nombre: 'Bimba', especie: 'Gato', raza: 'Persa', sexo: 'Hembra', color: 'Blanco', chip: '444555666777888', fecha: '2025-08-02', observaciones: 'Pelo muy largo', fotoUrl: '', estado: 'perdido' },

  // Adoptables
  { id: '11', nombre: 'Luna', especie: 'Perro', raza: 'Mestizo', sexo: 'Hembra', color: 'Marrón claro', chip: '', fecha: '2025-01-20', observaciones: 'Encontrada vagando, podría ser la Luna perdida', fotoUrl: '', estado: 'adoptable' }, // Coincidencia de nombre
  { id: '12', nombre: 'Max', especie: 'Perro', raza: 'Labrador', sexo: 'Macho', color: 'Dorado', chip: '333444555666777', fecha: '2025-02-05', observaciones: 'Muy juguetón', fotoUrl: '', estado: 'adoptable' },
  { id: '13', nombre: 'Leo', especie: 'Gato', raza: 'Común Europeo', sexo: 'Macho', color: 'Blanco y negro', chip: '222333444555666', fecha: '2025-03-15', observaciones: 'Tranquilo y cariñoso', fotoUrl: '', estado: 'adoptable' },
  { id: '14', nombre: 'Lola', especie: 'Perro', raza: 'Bodeguero', sexo: 'Hembra', color: 'Blanco y marrón', chip: '777888999000111', fecha: '2025-04-10', observaciones: 'Ideal para piso', fotoUrl: '', estado: 'adoptable' },
  { id: '15', nombre: 'Michi', especie: 'Gato', raza: 'Carey', sexo: 'Hembra', color: 'Multicolor', chip: '000111222333444', fecha: '2025-05-01', observaciones: 'Se lleva bien con perros', fotoUrl: '', estado: 'adoptable' },
  { id: '16', nombre: 'Bruno', especie: 'Perro', raza: 'Mestizo', sexo: 'Macho', color: 'Negro', chip: '', fecha: '2025-05-20', observaciones: 'Tamaño grande', fotoUrl: '', estado: 'adoptable' },
  { id: '17', nombre: 'Desconocido', especie: 'Perro', raza: 'Galgo', sexo: 'Hembra', color: 'Atigrado', chip: '123123123123123', fecha: '2025-06-18', observaciones: 'Encontrada sin collar, chip coincide con Nala', fotoUrl: '', estado: 'adoptable' }, // Coincidencia de chip
  { id: '18', nombre: 'Garfield', especie: 'Gato', raza: 'Común Europeo', sexo: 'Macho', color: 'Naranja', chip: '888777666555444', fecha: '2025-07-05', observaciones: 'Le encanta comer', fotoUrl: '', estado: 'adoptable' },
  { id: '19', nombre: 'Zeus', especie: 'Perro', raza: 'Pitbull', sexo: 'Macho', color: 'Gris', chip: '234234234234234', fecha: '2025-07-30', observaciones: 'Necesita licencia PPP', fotoUrl: '', estado: 'adoptable' },
  { id: '20', nombre: 'Pelusa', especie: 'Gato', raza: 'Angora', sexo: 'Hembra', color: 'Blanco', chip: '345345345345345', fecha: '2025-08-10', observaciones: 'Muy suave', fotoUrl: '', estado: 'adoptable' },

  // Adoptados
  { id: '21', nombre: 'Kira', especie: 'Perro', raza: 'Husky', sexo: 'Hembra', color: 'Gris y blanco', chip: '999000111222333', fecha: '2025-01-10', observaciones: 'Adoptada por familia numerosa', fotoUrl: '', estado: 'adoptado' }, // Coincidencia nombre (pero diferente raza)
  { id: '22', nombre: 'Balu', especie: 'Perro', raza: 'Mestizo', sexo: 'Macho', color: 'Marrón', chip: '888999000111222', fecha: '2025-02-25', observaciones: 'Vive en una casa con jardín', fotoUrl: '', estado: 'adoptado' },
  { id: '23', nombre: 'Salem', especie: 'Gato', raza: 'Común Europeo', sexo: 'Macho', color: 'Negro', chip: '777666555444333', fecha: '2025-03-20', observaciones: 'Adoptado en Sevilla Este', fotoUrl: '', estado: 'adoptado' },
  { id: '24', nombre: 'Nina', especie: 'Perro', raza: 'Yorkshire', sexo: 'Hembra', color: 'Plata y fuego', chip: '666555444333222', fecha: '2025-04-15', observaciones: 'Compañera de persona mayor', fotoUrl: '', estado: 'adoptado' },
  { id: '25', nombre: 'Gato sin nombre', especie: 'Gato', raza: 'Siamés', sexo: 'Hembra', color: 'Crema y marrón', chip: '', fecha: '2025-05-14', observaciones: 'Misma raza/color que Mía', fotoUrl: '', estado: 'adoptado' }, // Coincidencia raza/color
  { id: '26', nombre: 'Rex', especie: 'Perro', raza: 'Pastor Alemán', sexo: 'Macho', color: 'Negro y fuego', chip: '555444333222111', fecha: '2025-06-10', observaciones: 'Perro policía retirado', fotoUrl: '', estado: 'adoptado' },
  { id: '27', nombre: 'Milo', especie: 'Gato', raza: 'Azul Ruso', sexo: 'Macho', color: 'Gris', chip: '444333222111000', fecha: '2025-07-01', observaciones: 'Adoptado rápido', fotoUrl: '', estado: 'adoptado' },
  { id: '28', nombre: 'Duna', especie: 'Perro', raza: 'Podenco', sexo: 'Hembra', color: 'Canela', chip: '333222111000999', fecha: '2025-07-20', observaciones: 'Muy ágil', fotoUrl: '', estado: 'adoptado' },
  { id: '29', nombre: 'Paco', especie: 'Loro', raza: 'Agaporni', sexo: 'Macho', color: 'Verde', chip: '', fecha: '2025-08-05', observaciones: 'Papillero', fotoUrl: '', estado: 'adoptado' },
  { id: '30', nombre: 'Zoe', especie: 'Perro', raza: 'Bichón Maltés', sexo: 'Hembra', color: 'Blanco', chip: '222111000999888', fecha: '2025-08-12', observaciones: 'Adoptada', fotoUrl: '', estado: 'adoptado' }
];

class ZoosanitarioApp {
  constructor() {
    this.animals = [];
    this.currentTab = 'perdidos';
    this.sortState = {
      perdidos: { column: 'fecha', direction: 'desc' },
      adoptables: { column: 'fecha', direction: 'desc' },
      adoptados: { column: 'fecha', direction: 'desc' },
      todos: { column: 'fecha', direction: 'desc' }
    };
    this.charts = {
      species: null,
      sex: null,
      status: null,
      timeline: null
    };

    this.init();
  }

  init() {
    this.loadAnimals();
    this.setupEventListeners();
    this.updateSummary();
    this.populateFilterOptions();
    this.markInitialSortIndicators();
    this.renderTable('perdidos');
  }

  // Marca visualmente la columna "Fecha" como orden activo (↓ más reciente
  // primero) en las 4 tablas, ya que es el criterio por defecto al cargar.
  markInitialSortIndicators() {
    document.querySelectorAll('th[data-sort="fecha"]').forEach(th => {
      th.classList.add('sorted-desc');
    });
  }

  // --- 1. Gestión de datos (DataStore) ---

  loadAnimals() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : null;

      if (Array.isArray(parsed) && parsed.length > 0) {
        this.animals = parsed;
        return;
      }

      // No hay datos guardados válidos (o el array estaba vacío):
      // recurrir a los datos oficiales del Ayuntamiento si están disponibles,
      // o a los datos de ejemplo como último recurso.
      if (typeof DATOS_OFICIALES_SEVILLA !== 'undefined' && DATOS_OFICIALES_SEVILLA.length > 0) {
        this.animals = [...DATOS_OFICIALES_SEVILLA];
      } else {
        this.animals = [...DUMMY_DATA];
      }
      this.saveAnimals();
    } catch (error) {
      console.error('Error al cargar datos:', error);
      this.animals = typeof DATOS_OFICIALES_SEVILLA !== 'undefined' ? [...DATOS_OFICIALES_SEVILLA] : [...DUMMY_DATA];
    }
  }

  // Vuelve a renderizar la vista actualmente visible (tabla individual o vista "Todos")
  renderCurrentTab() {
    if (this.currentTab === 'todos') {
      this.renderTodosTable();
    } else if (['perdidos', 'adoptables', 'adoptados'].includes(this.currentTab)) {
      this.renderTable(this.currentTab);
    }
  }

  // Vacía el caché local (localStorage) y recarga los datos oficiales
  // del Ayuntamiento (si están disponibles) o los de ejemplo.
  forceReloadData() {
    if (!confirm('¿Recargar los datos?\n\nSe sustituirán los datos actuales por los oficiales del Ayuntamiento de Sevilla (o los de ejemplo si no están disponibles). Esta acción no se puede deshacer.')) {
      return;
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('No se pudo vaciar el almacenamiento local:', error);
    }

    if (typeof DATOS_OFICIALES_SEVILLA !== 'undefined' && DATOS_OFICIALES_SEVILLA.length > 0) {
      this.animals = [...DATOS_OFICIALES_SEVILLA];
    } else {
      this.animals = [...DUMMY_DATA];
    }
    this.saveAnimals();
    ['perdidos', 'adoptables', 'adoptados'].forEach(est => this.renderTable(est));
    this.renderTodosTable();
    if (this.currentTab === 'analisis') this.renderCharts();
    alert(`Datos recargados correctamente: ${this.animals.length} animales.`);
  }

  loadAyuntamientoOficial() {
    if (typeof DATOS_OFICIALES_SEVILLA !== 'undefined' && DATOS_OFICIALES_SEVILLA.length > 0) {
      this.animals = [...DATOS_OFICIALES_SEVILLA];
      this.saveAnimals();
      this.renderCurrentTab();
      alert(`¡Cargados con éxito ${this.animals.length} animales oficiales del Ayuntamiento de Sevilla!`);
    } else {
      alert('El archivo de datos oficiales no está disponible en este momento.');
    }
  }

  async syncWithAyuntamiento() {
    const btnSync = document.getElementById('btn-sync-ayto');
    const originalText = btnSync ? btnSync.innerHTML : '';
    if (btnSync) {
      btnSync.innerHTML = '⏳ Conectando con Sevilla...';
      btnSync.disabled = true;
    }

    try {
      // 1. Intentar primero con el servidor local proxy (http://localhost:8080/api/sincronizar)
      let res = await fetch('http://localhost:8080/api/sincronizar', { method: 'GET' }).catch(() => null);
      
      if (res && res.ok) {
        const json = await res.json();
        if (json.ok && Array.isArray(json.datos) && json.datos.length > 0) {
          this.animals = json.datos;
          this.saveAnimals();
          this.renderCurrentTab();
          if (this.currentTab === 'analisis') this.renderCharts();
          alert(`¡Sincronización en vivo completada!\nSe han descargado ${json.total} animales en tiempo real del Ayuntamiento de Sevilla.`);
          return;
        }
      }

      // 2. Si no responde el servidor local, intentar cargar datos_ayuntamiento.json estático
      let resJson = await fetch('datos_ayuntamiento.json').catch(() => null);
      if (resJson && resJson.ok) {
        const animales = await resJson.json();
        if (Array.isArray(animales) && animales.length > 0) {
          this.animals = animales;
          this.saveAnimals();
          this.renderCurrentTab();
          if (this.currentTab === 'analisis') this.renderCharts();
          alert(`Se han cargado ${animales.length} animales desde datos_ayuntamiento.json.\n\n⚠️ Esto es una copia guardada, no en vivo: puede no reflejar altas/bajas muy recientes en sevilla.org. Para datos realmente actualizados, ejecuta en tu terminal:\npython3 servidor.py`);
          return;
        }
      }

      // 3. Fallback: cargar los datos incrustados en memoria
      if (typeof DATOS_OFICIALES_SEVILLA !== 'undefined' && DATOS_OFICIALES_SEVILLA.length > 0) {
        this.animals = [...DATOS_OFICIALES_SEVILLA];
        this.saveAnimals();
        this.renderCurrentTab();
        if (this.currentTab === 'analisis') this.renderCharts();
        alert(`Se han cargado ${this.animals.length} animales desde la copia incrustada en la app (datos_sevilla.js).\n\n⚠️ Es la copia más antigua de las 3 fuentes disponibles — puede no reflejar altas/bajas recientes. Para sincronizar con los datos en vivo del Ayuntamiento, ejecuta en tu terminal:\npython3 servidor.py\ny abre después http://localhost:8080`);
        return;
      }

      alert('No se pudo conectar con el servicio en vivo ni con el archivo local.\nAsegúrate de ejecutar "python3 servidor.py" en la carpeta del proyecto.');
    } catch (err) {
      console.error(err);
      alert('Error en la sincronización: ' + err.message);
    } finally {
      if (btnSync) {
        btnSync.innerHTML = originalText;
        btnSync.disabled = false;
      }
    }
  }

  saveAnimals() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.animals));
      this.updateSummary();
      this.populateFilterOptions();
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  }

  // Rellena dinámicamente el desplegable "Especie" de cada pestaña
  // con las especies realmente presentes en los datos actuales.
  populateFilterOptions() {
    const especies = [...new Set(this.animals.map(a => a.especie).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'es'));

    ['perdidos', 'adoptables', 'adoptados', 'todos'].forEach(estado => {
      const select = document.getElementById(`filter-especie-${estado}`);
      if (!select) return;
      const current = select.value;
      select.innerHTML = '<option value="">Todas</option>' +
        especies.map(e => `<option value="${e}">${e}</option>`).join('');
      if (especies.includes(current)) select.value = current;
    });
  }

  getByEstado(estado) {
    return this.animals.filter(a => a.estado === estado);
  }

  getAnimal(id) {
    return this.animals.find(a => a.id === id);
  }

  addAnimal(animal) {
    animal.id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36);
    this.animals.push(animal);
    this.saveAnimals();
  }

  updateAnimal(id, data) {
    const index = this.animals.findIndex(a => a.id === id);
    if (index !== -1) {
      this.animals[index] = { ...this.animals[index], ...data };
      this.saveAnimals();
    }
  }

  deleteAnimal(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.animals = this.animals.filter(a => a.id !== id);
      this.saveAnimals();
      this.renderCurrentTab();
    }
  }

  changeEstado(id, nuevoEstado) {
    const animal = this.getAnimal(id);
    if (animal && animal.estado !== nuevoEstado) {
      animal.estado = nuevoEstado;
      this.saveAnimals();
      // Si estamos en una tabla, re-renderizar todas
      ['perdidos', 'adoptables', 'adoptados'].forEach(est => this.renderTable(est));
      this.renderTodosTable();
      
      // Actualizar gráficos si estamos en la pestaña de análisis
      if (this.currentTab === 'analisis') {
        this.renderCharts();
      }
    }
  }

  // --- UI y Renderizado ---

  updateSummary() {
    const counts = { perdido: 0, adoptable: 0, adoptado: 0 };
    this.animals.forEach(a => {
      if (counts[a.estado] !== undefined) counts[a.estado]++;
    });

    const elPerdidos = document.getElementById('summary-perdidos');
    const elAdoptables = document.getElementById('summary-adoptables');
    const elAdoptados = document.getElementById('summary-adoptados');

    if (elPerdidos) elPerdidos.textContent = counts.perdido;
    if (elAdoptables) elAdoptables.textContent = counts.adoptable;
    if (elAdoptados) elAdoptados.textContent = counts.adoptado;
  }

  renderTable(estado) {
    const tbody = document.getElementById(`table-${estado}`);
    if (!tbody) return;

    // 1. Filtrar por estado
    // Los ids/tabs usan el plural (perdidos, adoptables, adoptados) pero los
    // datos guardan el estado en singular (perdido, adoptable, adoptado).
    const ESTADO_SINGULAR = { perdidos: 'perdido', adoptables: 'adoptable', adoptados: 'adoptado' };
    let filtered = this.getByEstado(ESTADO_SINGULAR[estado] || estado);
    const totalEstado = filtered.length;

    // 2. Filtrar por búsqueda
    const searchInput = document.getElementById(`search-${estado}`);
    if (searchInput && searchInput.value.trim() !== '') {
      const term = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(a => 
        (a.nombre || '').toLowerCase().includes(term) ||
        (a.especie || '').toLowerCase().includes(term) ||
        (a.raza || '').toLowerCase().includes(term) ||
        (a.color || '').toLowerCase().includes(term) ||
        (a.chip || '').toLowerCase().includes(term)
      );
    }

    // 2b. Filtros por especie / sexo / microchip
    const especieSel = document.getElementById(`filter-especie-${estado}`);
    const sexoSel = document.getElementById(`filter-sexo-${estado}`);
    const chipSel = document.getElementById(`filter-chip-${estado}`);

    if (especieSel && especieSel.value) {
      filtered = filtered.filter(a => a.especie === especieSel.value);
    }
    if (sexoSel && sexoSel.value) {
      filtered = filtered.filter(a => (a.sexo || 'Desconocido') === sexoSel.value);
    }
    if (chipSel && chipSel.value) {
      filtered = filtered.filter(a => {
        const tieneChip = !!(a.chip && a.chip.trim());
        return chipSel.value === 'con' ? tieneChip : !tieneChip;
      });
    }

    // Actualizar contador de resultados
    const countEl = document.getElementById(`filter-count-${estado}`);
    if (countEl) {
      countEl.textContent = filtered.length === totalEstado
        ? `${totalEstado} animal${totalEstado === 1 ? '' : 'es'}`
        : `Mostrando ${filtered.length} de ${totalEstado}`;
    }

    // 3. Ordenar
    const sort = this.sortState[estado];
    if (sort.column) {
      filtered.sort((a, b) => {
        let valA = a[sort.column] || '';
        let valB = b[sort.column] || '';
        
        if (sort.column === 'fecha') {
          valA = new Date(valA).getTime() || 0;
          valB = new Date(valB).getTime() || 0;
        } else {
          valA = valA.toString().toLowerCase();
          valB = valB.toString().toLowerCase();
        }

        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // 4. Renderizar filas
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
      const mensaje = totalEstado === 0
        ? 'No hay animales en esta categoría'
        : 'Ningún animal coincide con los filtros aplicados';
      const accion = totalEstado === 0
        ? `<div style="margin-top: 0.75rem;"><button type="button" class="btn btn--secondary btn--small" data-action="reload-data">🔄 Recargar datos oficiales/de ejemplo</button></div>`
        : `<div style="margin-top: 0.75rem;"><button type="button" class="btn btn--secondary btn--small" data-action="clear-filters" data-estado="${estado}">✕ Limpiar filtros</button></div>`;
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem;">${mensaje}${accion}</td></tr>`;
      return;
    }

    filtered.forEach(animal => {
      const tr = document.createElement('tr');
      tr.className = `fade-in card-${animal.estado}`;
      
      const inicial = animal.nombre ? animal.nombre.charAt(0).toUpperCase() : '?';
      const imgHtml = animal.fotoUrl 
        ? `<img src="${animal.fotoUrl}" alt="${animal.nombre}" class="table-img photo-trigger" data-photo="${animal.fotoUrl}" data-caption="${animal.nombre} (${animal.raza})" style="cursor: zoom-in;" title="Haz clic para ampliar la foto" />`
        : `<div class="table-img-placeholder">${inicial}</div>`;

      const obsTooltip = animal.observaciones ? `title="${animal.observaciones.replace(/"/g, '&quot;')}"` : '';

      tr.innerHTML = `
        <td data-label="Foto">${imgHtml}</td>
        <td data-label="Nombre">
          <strong ${obsTooltip} style="cursor: help;">${animal.nombre || 'Sin nombre'}</strong>
          ${animal.observaciones ? `<div class="table-obs-preview">${animal.observaciones}</div>` : ''}
        </td>
        <td data-label="Especie">${animal.especie || '-'}</td>
        <td data-label="Raza">${animal.raza || '-'}</td>
        <td data-label="Sexo">${animal.sexo || '-'}</td>
        <td data-label="Color">${animal.color || '-'}</td>
        <td data-label="Microchip">${animal.chip || '-'}</td>
        <td data-label="Fecha">${this.formatDate(animal.fecha) || '-'}
          ${animal.estado === 'perdido' && animal.fecha ? (() => {
            const dias = this.getDiasDesde(animal.fecha);
            if (dias >= 20) {
              return `<div style="margin-top: 4px;"><span class="badge" style="background: #fef3c7; color: #b45309; border: 1px solid #f59e0b; font-size: 0.72rem; padding: 2px 6px;" title="Lleva ${dias} días en el centro. Ha cumplido el plazo legal de custodia (20 días) para pasar a adopción.">⏰ Apto adopción (${dias}d)</span></div>`;
            } else {
              return `<div style="margin-top: 4px; font-size: 0.75rem; color: #666;" title="Periodo de custodia legal en curso.">Custodia (${dias}/20d)</div>`;
            }
          })() : ''}
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Vista unificada "Todos": combina perdidos + adoptables + adoptados,
  // con filtro de Estado (checkboxes) además de búsqueda/especie/sexo/microchip.
  renderTodosTable() {
    const tbody = document.getElementById('table-todos');
    if (!tbody) return;

    // 1. Estados seleccionados mediante los checkboxes
    const estadoChecks = document.querySelectorAll('.estado-check[data-tab="todos"]');
    const estadosSeleccionados = Array.from(estadoChecks).filter(c => c.checked).map(c => c.value);
    const ningunEstadoSeleccionado = estadoChecks.length > 0 && estadosSeleccionados.length === 0;

    let filtered = ningunEstadoSeleccionado ? [] : this.animals.filter(a => estadosSeleccionados.includes(a.estado));
    const totalEstado = filtered.length;

    // 2. Búsqueda
    const searchInput = document.getElementById('search-todos');
    if (searchInput && searchInput.value.trim() !== '') {
      const term = searchInput.value.trim().toLowerCase();
      filtered = filtered.filter(a =>
        (a.nombre || '').toLowerCase().includes(term) ||
        (a.especie || '').toLowerCase().includes(term) ||
        (a.raza || '').toLowerCase().includes(term) ||
        (a.color || '').toLowerCase().includes(term) ||
        (a.chip || '').toLowerCase().includes(term)
      );
    }

    // 2b. Filtros por especie / sexo / microchip
    const especieSel = document.getElementById('filter-especie-todos');
    const sexoSel = document.getElementById('filter-sexo-todos');
    const chipSel = document.getElementById('filter-chip-todos');

    if (especieSel && especieSel.value) {
      filtered = filtered.filter(a => a.especie === especieSel.value);
    }
    if (sexoSel && sexoSel.value) {
      filtered = filtered.filter(a => (a.sexo || 'Desconocido') === sexoSel.value);
    }
    if (chipSel && chipSel.value) {
      filtered = filtered.filter(a => {
        const tieneChip = !!(a.chip && a.chip.trim());
        return chipSel.value === 'con' ? tieneChip : !tieneChip;
      });
    }

    // Contador de resultados
    const countEl = document.getElementById('filter-count-todos');
    if (countEl) {
      countEl.textContent = filtered.length === totalEstado
        ? `${totalEstado} animal${totalEstado === 1 ? '' : 'es'}`
        : `Mostrando ${filtered.length} de ${totalEstado}`;
    }

    // 3. Ordenar
    const sort = this.sortState.todos;
    if (sort.column) {
      filtered.sort((a, b) => {
        let valA = a[sort.column] || '';
        let valB = b[sort.column] || '';

        if (sort.column === 'fecha') {
          valA = new Date(valA).getTime() || 0;
          valB = new Date(valB).getTime() || 0;
        } else {
          valA = valA.toString().toLowerCase();
          valB = valB.toString().toLowerCase();
        }

        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // 4. Renderizar filas
    tbody.innerHTML = '';

    if (filtered.length === 0) {
      let mensaje;
      let accion = '';
      if (ningunEstadoSeleccionado) {
        mensaje = 'Selecciona al menos un estado (Perdidos, Adoptables o Adoptados) para ver animales';
      } else if (totalEstado === 0) {
        mensaje = 'No hay animales en los estados seleccionados';
        accion = `<div style="margin-top: 0.75rem;"><button type="button" class="btn btn--secondary btn--small" data-action="reload-data">🔄 Recargar datos oficiales/de ejemplo</button></div>`;
      } else {
        mensaje = 'Ningún animal coincide con los filtros aplicados';
        accion = `<div style="margin-top: 0.75rem;"><button type="button" class="btn btn--secondary btn--small" data-action="clear-filters" data-estado="todos">✕ Limpiar filtros</button></div>`;
      }
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2rem;">${mensaje}${accion}</td></tr>`;
      return;
    }

    const estadoBadge = {
      perdido: { label: 'Perdido', clase: 'badge--perdido' },
      adoptable: { label: 'Adoptable', clase: 'badge--adoptable' },
      adoptado: { label: 'Adoptado', clase: 'badge--adoptado' }
    };

    filtered.forEach(animal => {
      const tr = document.createElement('tr');
      tr.className = `fade-in card-${animal.estado}`;

      const inicial = animal.nombre ? animal.nombre.charAt(0).toUpperCase() : '?';
      const imgHtml = animal.fotoUrl
        ? `<img src="${animal.fotoUrl}" alt="${animal.nombre}" class="table-img photo-trigger" data-photo="${animal.fotoUrl}" data-caption="${animal.nombre} (${animal.raza})" style="cursor: zoom-in;" title="Haz clic para ampliar la foto" />`
        : `<div class="table-img-placeholder">${inicial}</div>`;

      const obsTooltip = animal.observaciones ? `title="${animal.observaciones.replace(/"/g, '&quot;')}"` : '';
      const badge = estadoBadge[animal.estado] || { label: animal.estado || '-', clase: '' };

      tr.innerHTML = `
        <td data-label="Foto">${imgHtml}</td>
        <td data-label="Nombre">
          <strong ${obsTooltip} style="cursor: help;">${animal.nombre || 'Sin nombre'}</strong>
          ${animal.observaciones ? `<div class="table-obs-preview">${animal.observaciones}</div>` : ''}
        </td>
        <td data-label="Especie">${animal.especie || '-'}</td>
        <td data-label="Raza">${animal.raza || '-'}</td>
        <td data-label="Sexo">${animal.sexo || '-'}</td>
        <td data-label="Color">${animal.color || '-'}</td>
        <td data-label="Microchip">${animal.chip || '-'}</td>
        <td data-label="Fecha">${this.formatDate(animal.fecha) || '-'}</td>
        <td data-label="Estado"><span class="badge ${badge.clase}">${badge.label}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  getDiasDesde(dateStr) {
    if (!dateStr) return 0;
    try {
      const f = new Date(dateStr);
      if (isNaN(f.getTime())) return 0;
      const hoy = new Date();
      const diff = Math.floor((hoy - f) / (1000 * 60 * 60 * 24));
      return Math.max(0, diff);
    } catch {
      return 0;
    }
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  }

  getStateOptions(currentState, id) {
    const states = ['perdidos', 'adoptables', 'adoptados'];
    const current = currentState === 'perdido' ? 'perdidos' : currentState;
    
    return states
      .filter(s => s !== current)
      .map(s => {
        let label = s.charAt(0).toUpperCase() + s.slice(1);
        let val = s === 'perdidos' ? 'perdido' : s;
        return `<button type="button" class="dropdown-item" data-action="set-state" data-id="${id}" data-state="${val}">${label}</button>`;
      }).join('');
  }

  clearFilters(estado) {
    if (!estado) return;
    const searchInput = document.getElementById(`search-${estado}`);
    const especieSel = document.getElementById(`filter-especie-${estado}`);
    const sexoSel = document.getElementById(`filter-sexo-${estado}`);
    const chipSel = document.getElementById(`filter-chip-${estado}`);
    if (searchInput) searchInput.value = '';
    if (especieSel) especieSel.value = '';
    if (sexoSel) sexoSel.value = '';
    if (chipSel) chipSel.value = '';

    if (estado === 'todos') {
      document.querySelectorAll('.estado-check[data-tab="todos"]').forEach(chk => { chk.checked = true; });
      this.renderTodosTable();
    } else {
      this.renderTable(estado);
    }
  }

  // --- Event Listeners ---

  setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.currentTarget.dataset.tab));
    });

    // Búsqueda
    ['perdidos', 'adoptables', 'adoptados'].forEach(estado => {
      const input = document.getElementById(`search-${estado}`);
      if (input) {
        input.addEventListener('input', () => this.renderTable(estado));
      }
    });

    const searchTodos = document.getElementById('search-todos');
    if (searchTodos) {
      searchTodos.addEventListener('input', () => this.renderTodosTable());
    }

    // Filtros (especie, sexo, microchip)
    document.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const estado = e.currentTarget.dataset.estado;
        if (!estado) return;
        if (estado === 'todos') this.renderTodosTable();
        else this.renderTable(estado);
      });
    });

    // Filtro de Estado (checkboxes) en la vista "Todos"
    document.querySelectorAll('.estado-check[data-tab="todos"]').forEach(chk => {
      chk.addEventListener('change', () => this.renderTodosTable());
    });



    // Ordenación
    document.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', (e) => {
        const column = e.currentTarget.dataset.sort;
        // Encontrar el estado contenedor de la tabla
        const tabPane = e.currentTarget.closest('.tab-pane');
        if (!tabPane) return;
        const estado = tabPane.id.replace('tab-', '');
        this.handleSort(estado, column, e.currentTarget);
      });
    });

    // Delegación de eventos para acciones en las tablas
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) {
        // Cerrar dropdowns si se hace click fuera
        document.querySelectorAll('.dropdown-content:not(.hidden)').forEach(d => d.classList.add('hidden'));
        return;
      }

      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if (action === 'edit') {
        this.openAnimalModal(null, id);
      } else if (action === 'delete') {
        this.deleteAnimal(id);
      } else if (action === 'state') {
        e.stopPropagation(); // Evitar que el document click cierre inmediatamente
        const dropdownContainer = btn.closest('.dropdown');
        const dropdown = dropdownContainer ? dropdownContainer.querySelector('.dropdown-content') : null;
        if (!dropdown) return;
        // Cerrar otros
        document.querySelectorAll('.dropdown-content:not(.hidden)').forEach(d => {
          if (d !== dropdown) d.classList.add('hidden');
        });
        dropdown.classList.toggle('hidden');
      } else if (action === 'set-state') {
        const newState = btn.dataset.state;
        this.changeEstado(id, newState);
      } else if (action === 'add') {
        this.openAnimalModal(btn.dataset.estado);
      } else if (action === 'import') {
        this.openImportModal(btn.dataset.estado);
      } else if (action === 'export') {
        const est = btn.dataset.estado;
        this.exportData('csv', est === 'todos' ? null : est);
      } else if (action === 'reload-data') {
        this.forceReloadData();
      } else if (action === 'clear-filters') {
        this.clearFilters(btn.dataset.estado);
      } else if (action === 'confirm-transition') {
        const sId = btn.dataset.sourceId;
        const tId = btn.dataset.targetId;
        const s = this.getAnimal(sId);
        const t = this.getAnimal(tId);
        if (s && t && confirm(`¿Confirmar que el animal encontrado "${s.nombre}" ha pasado a ser el adoptable "${t.nombre}"?`)) {
          s.observaciones = (s.observaciones || '') + ` | Transición confirmada: Ahora en adopción como ${t.nombre}`;
          this.saveAnimals();
          alert('¡Transición registrada con éxito en el sistema!');
          btn.innerHTML = '✓ Transición Confirmada';
          btn.disabled = true;
        }
      }
    });

    // Modal forms
    const animalForm = document.getElementById('animal-form');
    if (animalForm) {
      animalForm.addEventListener('submit', (e) => this.handleAnimalSubmit(e));
    }

    const importForm = document.getElementById('import-form');
    if (importForm) {
      importForm.addEventListener('submit', (e) => this.handleImportSubmit(e));
      
      const formatSelect = document.getElementById('import-format');
      const textarea = document.getElementById('import-textarea');
      if (formatSelect) formatSelect.addEventListener('change', () => this.updateImportPreview());
      if (textarea) textarea.addEventListener('input', () => this.updateImportPreview());
    }

    // Modal cierres
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModals();
      });
    });

    // Botón "✕" de cerrar (animal-modal, import-modal, photo-modal)
    document.querySelectorAll('.close-btn[data-close]').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    // Botones genéricos de abrir modal
    const btnAddPerdido = document.getElementById('btn-add-perdido');
    if (btnAddPerdido) btnAddPerdido.addEventListener('click', () => this.openAnimalModal('perdido'));
    
    const btnAddAdoptable = document.getElementById('btn-add-adoptable');
    if (btnAddAdoptable) btnAddAdoptable.addEventListener('click', () => this.openAnimalModal('adoptable'));
    
    const btnAddAdoptado = document.getElementById('btn-add-adoptado');
    if (btnAddAdoptado) btnAddAdoptado.addEventListener('click', () => this.openAnimalModal('adoptado'));

    // Botón Sincronizar con el Ayuntamiento (REST)
    const btnSyncAyto = document.getElementById('btn-sync-ayto');
    if (btnSyncAyto) btnSyncAyto.addEventListener('click', () => this.syncWithAyuntamiento());

    const btnLoadAytoJson = document.getElementById('btn-load-ayto-json');
    if (btnLoadAytoJson) btnLoadAytoJson.addEventListener('click', () => {
      this.loadAyuntamientoOficial();
      this.closeModals();
    });

    // Subida de archivos desde PC (modal importación)
    const btnSelectFile = document.getElementById('btn-select-file');
    const fileInputUpload = document.getElementById('file-input-upload');
    if (btnSelectFile && fileInputUpload) {
      btnSelectFile.addEventListener('click', () => fileInputUpload.click());
      fileInputUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          const textarea = document.getElementById('import-textarea');
          if (textarea) {
            textarea.value = content;
            if (file.name.endsWith('.json')) {
              document.getElementById('import-format').value = 'json';
            } else if (file.name.endsWith('.csv')) {
              document.getElementById('import-format').value = 'csv';
            }
            this.updateImportPreview();
          }
        };
        reader.readAsText(file);
      });
    }

    // Visor de foto ampliada (Lightbox) al hacer clic en cualquier foto
    document.addEventListener('click', (e) => {
      const imgTarget = e.target.closest('.photo-trigger');
      if (imgTarget) {
        const photoUrl = imgTarget.dataset.photo;
        const caption = imgTarget.dataset.caption || '';
        if (photoUrl) {
          this.openPhotoModal(photoUrl, caption);
        }
      }
    });

    // Botón de Plazo de Custodia
    const btnFilterCustody = document.getElementById('btn-filter-custody');
    if (btnFilterCustody) {
      btnFilterCustody.addEventListener('click', () => this.renderCustodyAlerts());
    }
  }

  openPhotoModal(url, caption) {
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('photo-modal-img');
    const modalCaption = document.getElementById('photo-modal-caption');
    if (modal && modalImg) {
      modalImg.src = url;
      if (modalCaption) modalCaption.textContent = caption;
      modal.classList.add('modal-overlay--active');
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update buttons
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      btn.classList.toggle('tab-btn--active', btn.dataset.tab === tabId);
    });

    // Update panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('tab-pane--active', pane.id === `tab-${tabId}`);
    });

    // Acciones específicas por pestaña
    if (['perdidos', 'adoptables', 'adoptados'].includes(tabId)) {
      this.renderTable(tabId);
    } else if (tabId === 'todos') {
      this.renderTodosTable();
    } else if (tabId === 'analisis') {
      this.renderCharts();
    } else if (tabId === 'comparar') {
      this.renderCustodyAlerts();
    }
  }

  handleSort(estado, column, thElement) {
    const state = this.sortState[estado];
    
    // Toggle direction
    if (state.column === column) {
      state.direction = state.direction === 'asc' ? 'desc' : 'asc';
    } else {
      state.column = column;
      state.direction = 'asc';
    }

    // Reset classes on all th in this table
    const tr = thElement.parentElement;
    tr.querySelectorAll('th').forEach(th => {
      th.classList.remove('sorted-asc', 'sorted-desc');
    });

    // Set class on current
    thElement.classList.add(`sorted-${state.direction}`);

    if (estado === 'todos') {
      this.renderTodosTable();
    } else {
      this.renderTable(estado);
    }
  }

  // --- Modales ---

  openAnimalModal(estadoPredeterminado = 'perdido', id = null) {
    const modal = document.getElementById('animal-modal');
    const form = document.getElementById('animal-form');
    const title = document.getElementById('modal-title');
    if (!modal || !form) return;

    form.reset();

    if (id) {
      const animal = this.getAnimal(id);
      if (animal) {
        title.textContent = 'Editar Animal';
        form.dataset.id = id;
        
        document.getElementById('form-nombre').value = animal.nombre || '';
        document.getElementById('form-especie').value = animal.especie || '';
        document.getElementById('form-raza').value = animal.raza || '';
        document.getElementById('form-sexo').value = animal.sexo || '';
        document.getElementById('form-color').value = animal.color || '';
        document.getElementById('form-chip').value = animal.chip || '';
        document.getElementById('form-fecha').value = animal.fecha || '';
        document.getElementById('form-observaciones').value = animal.observaciones || '';
        document.getElementById('form-foto').value = animal.fotoUrl || '';
        document.getElementById('form-estado').value = animal.estado || 'perdido';
      }
    } else {
      title.textContent = 'Nuevo Animal';
      delete form.dataset.id;
      
      // Select the correct state if opened from a specific tab
      const current = this.currentTab === 'perdidos' ? 'perdido' : this.currentTab;
      document.getElementById('form-estado').value = estadoPredeterminado || current || 'perdido';
      
      // Default date to today
      document.getElementById('form-fecha').value = new Date().toISOString().split('T')[0];
    }

    modal.classList.add('modal-overlay--active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('modal-overlay--active'));
  }

  handleAnimalSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    const data = {
      nombre: document.getElementById('form-nombre').value.trim(),
      especie: document.getElementById('form-especie').value,
      raza: document.getElementById('form-raza').value.trim(),
      sexo: document.getElementById('form-sexo').value,
      color: document.getElementById('form-color').value.trim(),
      chip: document.getElementById('form-chip').value.trim(),
      fecha: document.getElementById('form-fecha').value,
      observaciones: document.getElementById('form-observaciones').value.trim(),
      fotoUrl: document.getElementById('form-foto').value.trim(),
      estado: document.getElementById('form-estado').value
    };

    if (form.dataset.id) {
      this.updateAnimal(form.dataset.id, data);
    } else {
      this.addAnimal(data);
    }

    this.closeModals();
    this.renderCurrentTab();
  }

  // --- Importación ---

  openImportModal(estado = 'perdido') {
    const modal = document.getElementById('import-modal');
    if (modal) {
      document.getElementById('import-form').reset();
      document.getElementById('import-preview').innerHTML = '';
      const estadoSelect = document.getElementById('import-estado');
      if (estadoSelect) estadoSelect.value = estado;
      modal.classList.add('modal-overlay--active');
    }
  }

  updateImportPreview() {
    const format = document.getElementById('import-format').value;
    const text = document.getElementById('import-textarea').value.trim();
    const preview = document.getElementById('import-preview');
    
    if (!text) {
      preview.innerHTML = '';
      return;
    }

    const estadoSelect = document.getElementById('import-estado').value;

    try {
      const parsed = this.parseImportData(text, format, estadoSelect);
      if (parsed.length > 0) {
        preview.innerHTML = `<p style="color: green;">✓ ${parsed.length} registros válidos encontrados listos para importar.</p>
                             <small>Ejemplo del primero: ${parsed[0].nombre} (${parsed[0].especie})</small>`;
      } else {
        preview.innerHTML = `<p style="color: red;">No se encontraron registros válidos.</p>`;
      }
    } catch (e) {
      preview.innerHTML = `<p style="color: red;">Error de formato: ${e.message}</p>`;
    }
  }

  parseImportData(text, format, estadoSeleccionado = 'perdido') {
    let result = [];
    if (format === 'json') {
      const data = JSON.parse(text);
      result = Array.isArray(data) ? data : [data];
    } else if (format === 'csv') {
      const lines = text.split('\n');
      if (lines.length > 1) {
        const headers = lines[0].split(/[;,]/).map(h => h.trim().toLowerCase());
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const values = lines[i].split(/[;,]/).map(v => v.trim());
          let obj = {};
          headers.forEach((h, idx) => {
            if (values[idx]) obj[h] = values[idx];
          });
          result.push(obj);
        }
      }
    } else if (format === 'texto' || format === 'text') {
      const lines = text.split('\n');
      lines.forEach(line => {
        if (!line.trim()) return;
        const parts = line.split('-').map(p => p.trim());
        if (parts.length >= 2) {
          result.push({
            nombre: parts[0],
            especie: parts[1],
            raza: parts[2] || '',
            sexo: parts[3] || 'Desconocido',
            color: parts[4] || ''
          });
        }
      });
    }

    // Validar mínimos
    return result.filter(item => item.nombre && item.especie).map(item => ({
      nombre: item.nombre,
      especie: item.especie,
      raza: item.raza || '',
      sexo: item.sexo || 'Desconocido',
      color: item.color || '',
      chip: item.chip || '',
      fecha: item.fecha || new Date().toISOString().split('T')[0],
      observaciones: item.observaciones || 'Importado',
      fotoUrl: item.fotoUrl || '',
      estado: item.estado || estadoSeleccionado
    }));
  }

  handleImportSubmit(e) {
    e.preventDefault();
    const format = document.getElementById('import-format').value;
    const text = document.getElementById('import-textarea').value.trim();
    
    const estadoSelect = document.getElementById('import-estado').value;
    
    if (!text) return;

    try {
      const parsed = this.parseImportData(text, format, estadoSelect);
      let count = 0;
      parsed.forEach(data => {
        this.addAnimal(data);
        count++;
      });
      alert(`Se importaron ${count} animales correctamente.`);
      this.closeModals();
      this.renderCurrentTab();
    } catch (error) {
      alert(`Error al importar: ${error.message}`);
    }
  }

  // --- Exportar (Utilidad global) ---
  exportData(formato = 'json', estado = null) {
    let data = estado ? this.getByEstado(estado) : this.animals;
    let content = '';
    let mime = '';
    let ext = '';

    if (formato === 'json') {
      content = JSON.stringify(data, null, 2);
      mime = 'application/json';
      ext = 'json';
    } else if (formato === 'csv') {
      const headers = ['id','nombre','especie','raza','sexo','color','chip','fecha','estado','observaciones'];
      content = headers.join(',') + '\n';
      content += data.map(a => {
        return headers.map(h => {
          let val = (a[h] || '').toString();
          if (val.includes(',') || val.includes('"') || val.includes('\n')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(',');
      }).join('\n');
      mime = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zoosanitario_export_${new Date().getTime()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Alertas de Plazo de Custodia y Paso a Adopción ---

  renderCustodyAlerts() {
    const container = document.getElementById('comparison-results');
    if (!container) return;

    const perdidos = this.getByEstado('perdido');
    const aptos = [];
    const enCustodia = [];

    perdidos.forEach(a => {
      const dias = this.getDiasDesde(a.fecha);
      if (dias >= 20) {
        aptos.push({ animal: a, dias });
      } else {
        enCustodia.push({ animal: a, dias });
      }
    });

    // Ordenar aptos por días descendente
    aptos.sort((a, b) => b.dias - a.dias);

    let html = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm); width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; color: #b45309; display: flex; align-items: center; gap: 0.5rem;">
              <span>⏰</span> Animales con Plazo de Custodia Cumplido (${aptos.length})
            </h3>
            <p style="margin: 0.25rem 0 0 0; color: var(--color-text-secondary); font-size: 0.875rem;">
              Según la normativa zoosanitaria municipal, los animales encontrados que superan los <strong>20 días de custodia</strong> sin ser reclamados son legalmente aptos para pasar a ser <strong>Adoptables</strong>.
            </p>
          </div>
        </div>
      </div>
    `;

    if (aptos.length === 0) {
      html += `
        <div style="text-align: center; padding: 2.5rem; background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
          <p>No hay animales encontrados que hayan superado los 20 días de custodia actualmente.</p>
        </div>
      `;
    } else {
      aptos.forEach(({ animal, dias }) => {
        const img = animal.fotoUrl
          ? `<img src="${animal.fotoUrl}" alt="${animal.nombre}" class="comparison-animal-img photo-trigger" data-photo="${animal.fotoUrl}" data-caption="${animal.nombre} (${animal.raza})" title="Haz clic para ver foto ampliada">`
          : `<div class="table-img-placeholder" style="width: 85px; height: 85px; font-size: 1.75rem; border-radius: var(--radius-md); flex-shrink: 0;">${animal.nombre ? animal.nombre.charAt(0) : '?'}</div>`;

        html += `
          <div class="comparison-card fade-in" style="border-left: 4px solid #f59e0b;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <span class="badge" style="background: #fef3c7; color: #b45309; border: 1px solid #f59e0b; font-weight: 600;">
                ⏰ Lleva ${dias} días en el centro (Ingreso: ${this.formatDate(animal.fecha)})
              </span>
            </div>

            <div style="display: flex; gap: 1.25rem; align-items: flex-start; margin-top: 0.75rem;">
              ${img}
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.25rem;">${animal.nombre}</div>
                <div style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.5rem;">
                  <strong>${animal.especie}</strong> • ${animal.raza} • <strong>${animal.sexo}</strong> • Chip: ${animal.chip || 'No especificado'}
                </div>
                ${animal.observaciones ? `<div class="comparison-animal-obs">${animal.observaciones}</div>` : ''}
              </div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  }

  // --- Gráficas (Chart.js) ---

  renderCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js no está cargado');
      return;
    }

    // Colores según CSS
    const colors = {
      perdidos: 'hsl(14, 58%, 52%)',
      adoptables: 'hsl(38, 68%, 52%)',
      adoptados: 'hsl(152, 42%, 42%)',
      perro: 'hsl(38, 68%, 52%)',
      gato: 'hsl(152, 42%, 42%)',
      otro: 'hsl(30, 8%, 46%)'
    };

    // Destruir previas
    Object.keys(this.charts).forEach(key => {
      if (this.charts[key]) {
        this.charts[key].destroy();
        this.charts[key] = null;
      }
    });

    // Procesar datos
    let stats = {
      especies: { Perro: 0, Gato: 0, Otro: 0 },
      estado: { perdido: 0, adoptable: 0, adoptado: 0 },
      sexoPorEstado: {
        perdido: { Macho: 0, Hembra: 0, Desconocido: 0 },
        adoptable: { Macho: 0, Hembra: 0, Desconocido: 0 },
        adoptado: { Macho: 0, Hembra: 0, Desconocido: 0 }
      },
      meses: {}
    };

    this.animals.forEach(a => {
      // Especies
      let esp = a.especie || 'Otro';
      if (!stats.especies[esp]) stats.especies[esp] = 0;
      stats.especies[esp]++;

      // Estado
      if (stats.estado[a.estado] !== undefined) {
        stats.estado[a.estado]++;
      }

      // Sexo por estado
      if (a.estado && stats.sexoPorEstado[a.estado]) {
        let sx = a.sexo || 'Desconocido';
        if (stats.sexoPorEstado[a.estado][sx] !== undefined) {
          stats.sexoPorEstado[a.estado][sx]++;
        }
      }

      // Meses (Agrupación simple YYYY-MM)
      if (a.fecha) {
        const mesStr = a.fecha.substring(0, 7); // YYYY-MM
        if (!stats.meses[mesStr]) stats.meses[mesStr] = 0;
        stats.meses[mesStr]++;
      }
    });

    // 1. Gráfica Especies (Donut)
    const ctxSpecies = document.getElementById('chart-species');
    if (ctxSpecies) {
      this.charts.species = new Chart(ctxSpecies, {
        type: 'doughnut',
        data: {
          labels: Object.keys(stats.especies),
          datasets: [{
            data: Object.values(stats.especies),
            backgroundColor: [colors.perro, colors.gato, colors.otro]
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Distribución por Especie' } } }
      });
    }

    // 2. Gráfica Estado (Barra vertical)
    const ctxStatus = document.getElementById('chart-status');
    if (ctxStatus) {
      this.charts.status = new Chart(ctxStatus, {
        type: 'bar',
        data: {
          labels: ['Perdidos', 'Adoptables', 'Adoptados'],
          datasets: [{
            label: 'Total',
            data: [stats.estado.perdido, stats.estado.adoptable, stats.estado.adoptado],
            backgroundColor: [colors.perdidos, colors.adoptables, colors.adoptados]
          }]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { title: { display: true, text: 'Total por Estado' }, legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }

    // 3. Gráfica Sexo (Barra horizontal apilada)
    const ctxSex = document.getElementById('chart-sex');
    if (ctxSex) {
      this.charts.sex = new Chart(ctxSex, {
        type: 'bar',
        data: {
          labels: ['Perdidos', 'Adoptables', 'Adoptados'],
          datasets: [
            {
              label: 'Machos',
              data: [stats.sexoPorEstado.perdido.Macho, stats.sexoPorEstado.adoptable.Macho, stats.sexoPorEstado.adoptado.Macho],
              backgroundColor: '#3b82f6'
            },
            {
              label: 'Hembras',
              data: [stats.sexoPorEstado.perdido.Hembra, stats.sexoPorEstado.adoptable.Hembra, stats.sexoPorEstado.adoptado.Hembra],
              backgroundColor: '#ec4899'
            },
            {
              label: 'Desconocido',
              data: [stats.sexoPorEstado.perdido.Desconocido, stats.sexoPorEstado.adoptable.Desconocido, stats.sexoPorEstado.adoptado.Desconocido],
              backgroundColor: '#9ca3af'
            }
          ]
        },
        options: { 
          indexAxis: 'y',
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { title: { display: true, text: 'Sexo por Estado' } },
          scales: { x: { stacked: true }, y: { stacked: true } }
        }
      });
    }

    // 4. Gráfica Temporal (Línea o Barra)
    const ctxTimeline = document.getElementById('chart-timeline');
    if (ctxTimeline) {
      // Ordenar meses
      const mesesLabels = Object.keys(stats.meses).sort();
      const mesesData = mesesLabels.map(m => stats.meses[m]);

      this.charts.timeline = new Chart(ctxTimeline, {
        type: 'line',
        data: {
          labels: mesesLabels,
          datasets: [{
            label: 'Registros',
            data: mesesData,
            borderColor: colors.adoptables,
            backgroundColor: 'rgba(212, 160, 48, 0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { title: { display: true, text: 'Ingresos por Mes' } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
      });
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ZoosanitarioApp();
});
