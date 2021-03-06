const hbs = require('hbs');
const funciones = require('./funciones');

hbs.registerHelper('createJson', () => funciones.initJson());

hbs.registerHelper('createCourse', (name, id, desc, valor, mod, int, est) =>
	funciones.crearC({name, id, desc, valor, mod, int, est}));

hbs.registerHelper('listarCursos', () => {
	try {
		listC = require('../ListC.json');
	} catch(err) {
		listC = [];
		funciones.initJson();
	}
	let aux = listC.filter(a => a.est == "disponible");
	let txt = 'No hay cursos disponibles';
	if(aux.length > 0){
		txt = '<div class="accordion mb-3" id="accordionExample">';
		aux.forEach((c, i) => {
			txt += 
				`
				<div class="card">
					<div class="card-header" id="heading${i + 1}">
						<h2 class="mb-0">
							<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i + 1}" aria-expanded="true" aria-controls="collapse${i + 1}">
								${c.name} - ID: ${c.id} - Valor: ${c.valor} $
							</button>
						</h2>
					</div>

					<div id="collapse${i + 1}" class="collapse" aria-labellebdy="heading${i + 1}" data-parent="#accordionExample">
						<div class="card-body">
							Descripción: ${c.desc} <br>
							Modalidad: ${c.mod} <br>
							Intensida horaria: ${c.int} horas
							<div class="row justify-content-center my-2">
								<a href="/inscripcion"><button class="btn btn-outline-success">Inscibirme en este curso</button></a>
							</div>
						</div>
					</div>
				</div>
				`
		});
		txt += '</div>';
	}
	return txt;
});

hbs.registerHelper('deleteAsp', (idA, idC) => 
	funciones.deleteAsp(idA, idC));

hbs.registerHelper('listarAspCurso', (idC) => {
	try {
		listA = require('../ListA.json');
		listC = require('../ListC.json');
	} catch(err) {
		listA = [];
		listC = [];
		funciones.initJson();
	}

	c = listC.find(cu => cu.id == idC);
	let txt = '<h1 class="display-4">No hay un curso con ese ID</h1>';
	if(c){
		asp = listA.filter(a => a.curso.id == idC);
		txt = 
			`
			<table class="table table-striped">
				<thead class="thead-dark">
					<tr>
						<th scope="col">#</th>
					    <th scope="col">Nombre</th>
					    <th scope="col">Identificación</th>
					</tr>
				</thead>
				<tbody>
			`
		if (asp.length > 0) {
			asp.forEach((a, index) => {
			txt += 
			`
			<tr>
				<th scope="row">${index + 1}</th>
				<td>${a.name}</td>
				<td>${a.id}</td>
			</tr>
			`
			});
		} else {
			txt += 
			`
			<tr>
				<th scope="row">Error:</td>
				<td>504</td>
				<td>No hay aspirantes para este curso</td>
			</tr>
			`
		}
		
		txt += 
			`			</tbdody>
					</table>
				</div>
			</div>
			`
	}
	return txt;
});

hbs.registerHelper('listarAspirantes', () => {
	try {
		listC = require('../ListC.json');
	} catch(err) {
		listC = [];
		funciones.initJson();
	}
	listC = require('../ListC.json');
	let aux = listC.filter(a => a.est == "disponible");
	let txt = 'No hay cursos disponibles';
	if(aux.length > 0){
		listA = require('../ListA.json');
		txt = "<div class='accordion' id='accordionExample'>";
		aux.forEach((c, i) => {
			txt += 
				`
				<div class="card">
					<div class="card-header" id="heading${i + 1}">
						<h2 class="mb-0">
							<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i + 1}" aria-expanded="true" aria-controls="collapse${i + 1}">
								${c.name} - ID: ${c.id}
							</button>
						</h2>
					</div>
				`
			asp = listA.filter(a => a.curso.id == c.id);
			if(asp.length > 0){
				txt += 
				`
				<div id="collapse${i + 1}" class="collapse" aria-labellebdy="heading${i + 1}" data-parent="#accordionExample">
					<div class="card-body">
						<table class="table table-striped">
							<thead class="thead-dark">
								<tr>
									<th scope="col">#</th>
								    <th scope="col">Nombre</th>
								    <th scope="col">Identificación</th>
								    <th scope="col">Eliminar</th>
								</tr>
							</thead>
							<tbody>
				`
				asp.forEach((a, index) => {
					txt += 
					`
					<tr>
						<th scope="row">${index + 1}</th>
						<td>${a.name}</td>
						<td>${a.id}</td>
						<td>
							<form action="/delAsp" method="POST">
								<div class="form-group">
									<input type="hidden" name="idC" value=${c.id}>
									<button type="submit" class="btn btn-outline-danger" name="idA" value=${a.id}>
							    		Eliminar
							    	</button>
							    </div>
							</form>
						</td>
					</tr>
					`
				});
				txt += 
					`			</tbody>
							</table>
						</div>
					</div>
					`
			} else {
				txt += 
					`
					<div id="collapse${i + 1}" class="collapse" aria-labellebdy="heading${i + 1}" data-parent="#accordionExample">
						<div class="card-body">
							No hay aspirantes para este curso
						</div>
					</div>
					`
			}
		});
		txt += '</div>';
	}
	return txt;
});

hbs.registerHelper('inscribirAsp', (id, name, email, tel, c) => 
	funciones.inscribirAsp({id, name, email, tel, c}));

hbs.registerHelper('cambiarEstado', (idC) => 
	funciones.cambiarEstado(idC));