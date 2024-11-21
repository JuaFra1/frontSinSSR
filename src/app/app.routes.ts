import { Routes } from '@angular/router';
import { AccesoComponent } from './acceso/acceso.component';
import { ArrendamientosActualesComponent } from './arrendador/arrendamientos-actuales/arrendamientos-actuales.component';
import { HistorialArrendadorComponent } from './arrendador/historial-arrendador/historial-arrendador.component';
import { InicioComponentArrendador } from './arrendador/inicio/inicio.component';
import { PublicarPropiedadComponent } from './arrendador/publicar-propiedad/publicar-propiedad.component';
import { ArrendamientosProgramadosComponent } from './arrendatario/arrendamientos-programados/arrendamientos-programados.component';
import { HistorialArrendatarioComponent } from './arrendatario/historial-arrendatario/historial-arrendatario.component';
import { InicioComponentArrendatario } from './arrendatario/inicio/inicio.component';
import { ListaDeseosComponent } from './arrendatario/lista-deseos/lista-deseos.component';
import { PrincipalLandingComponent } from './landing/principal-landing/principal-landing.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { DetallesPropiedadComponentArrendador } from './arrendador/detalles-propiedad/detalles-propiedad.component';
import { EdicionPropiedadComponent } from './arrendador/edicion-propiedad/edicion-propiedad.component';
import { CalificarComponent } from './calificar/calificar.component';


export const routes: Routes = [
    //General
    { path: '', component: PrincipalLandingComponent },
    { path: 'login', component: AccesoComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'arrendatario', component: InicioComponentArrendatario },
    { path: 'arrendador', component: InicioComponentArrendador },
    { path: 'perfil' , component: PerfilComponent},
    { path: 'calificar/:id/:tipo', component: CalificarComponent }, // Ruta para CalificarComponent


    //Arrendatario 

    { path: 'lista-deseos', component: ListaDeseosComponent},
    { path: 'arrendamientos-programados', component: ArrendamientosProgramadosComponent},
    { path: 'historial-arrendatario', component: HistorialArrendatarioComponent},
    //arrendador
    { path: 'historial-arrendador', component: HistorialArrendadorComponent},
    { path: 'arrendamientos-actuales', component: ArrendamientosActualesComponent},
    { path: 'publicar-propiedad', component: PublicarPropiedadComponent},
    { path: 'arrendador/detalles-propiedad/:id', component: DetallesPropiedadComponentArrendador },
    { path: 'arrendador/edicionPropiedad/:id', component: EdicionPropiedadComponent },
    { path: '**', redirectTo: '' },// Redirige a la página principal si la ruta no se encuentra
];