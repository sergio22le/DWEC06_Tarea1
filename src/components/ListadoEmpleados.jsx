import { useEffect, useState } from "react";
import Empleado from "./Empleado";

const ListadoEmpleados = () => {

    /* Crear un 'useState' para manejar el listado de empleados, 'empleados' es un array que almacena
    objetos 'empleado' y 'setEmpleados' es la funcion que lo actualiza */
    const [empleados, setEmpleados] = useState([]);

    // Función para obtener empleados aleatorios
    const fetchEmpleados = async () => {
        // Obtener un numero aleatorio entre 5 y 10
        const count = Math.floor(Math.random() * 6) + 5;
        // Recuperar de la API 'randomuser' el numero de registros almacenado en count
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        const data = await response.json();
        // Modificar mediante el useState el objeto empleados
        setEmpleados(data.results);
    };

    useEffect(() => {
        fetchEmpleados();
    // Cargar al renderizar la pagina
    }, []);

    // Funcion para despedir empleados
    const despedir = (id) => {
        /* Se modifica 'empleados' con todos los empleados menos el que coincide con el id pasado por parametro a la funcion
        y al llamar al useState se vuelve a renderizar automaticamente la pagina */
        setEmpleados(empleados.filter((emp) => emp.login.uuid !== id));
    };

    // Funcion para contratar empleados
    const contratar = async () => {
        // Solo se pide un registro
        const response = await fetch('https://randomuser.me/api/?results=1');
        const data = await response.json();
        // Se guarda ese registro en 'nuevoEmpleado'
        const nuevoEmpleado = data.results[0];
        // Se añade al final de 'empleados'
        setEmpleados([...empleados, nuevoEmpleado]);
    };
    

    return (
        <main>
        <section className="container"> 
            {/* Controlar el numero de registro en empleados para elegir que renderizar */}
            {empleados.length > 0 ? (
                <>
                {/* Si hay algun registro se muestra el numero y los datos del empleado */}
                <h3>Tenemos una plantilla de {empleados.length} trabajadores</h3>
                {/* Al renderizar se pasa como prop a cada 'Empleado' el objeto empleado correspondiente y el metodo despedir */}
                {empleados.map((emp) => (
                    <Empleado key={emp.login.uuid} empleado={emp} despedir={() => despedir(emp.login.uuid)} />
                ))}
                </>
            )
            : (
                <>
                    {/* Si no hay registros se muestra este mensaje */}
                    <h3>No hay más empleados en la empresa</h3>
                </>
            )}
            <button className="contratar" onClick={contratar}>Contratar</button>
        </section>
        </main>
    );
    };

    export default ListadoEmpleados;