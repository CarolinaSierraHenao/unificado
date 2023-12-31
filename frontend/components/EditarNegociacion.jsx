import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'

const EditarNegociacion = () => {
    const { id } = useParams();
    //Hooks
    const [anticipo, setAnticipo] = useState('')
    const [tasa, setTasa] = useState('')
    const [interes, setInteres] = useState('')
    const [numCuotas, setNumCuotas] = useState('')
    const [numFactura, setNumFactura] = useState('')
    const [dataProductos, setDataProductos] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState('');
    const [cantidad, setCantidad] = useState('')
    const [referencia, setReferencia] = useState('')
    const [fechaFacturacion, setFechaFacturacion] = useState('')
    const [dataClientes, setDataClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4000/api/negociacion/obtenerdatanegociacion/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener los datos de la negociación');
                }
                return res.json();
            })
            .then((datanegociacion) => {
                setAnticipo(datanegociacion.anticipo)
                setTasa(datanegociacion.tasa)
                setInteres(datanegociacion.interes)
                setNumCuotas(datanegociacion.numCuotas)
                setNumFactura(datanegociacion.numFactura)
                setSelectedProducto(datanegociacion.tipoMaquina);
                setCantidad(datanegociacion.cantidad)
                setReferencia(datanegociacion.referencia)
                setFechaFacturacion(datanegociacion.fechaFacturacion)
                setSelectedCliente(datanegociacion.cliente);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    useEffect(() => {
        fetch('http://localhost:4000/api/cliente/obtenerCliente')
            .then((res) => res.json())
            .then((data) => {
                setDataClientes(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/api/producto/obtenerProducto')
            .then((res) => res.json())
            .then((data) => {
                setDataProductos(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //Función para actualizar
    const actualizarNegociacion = async () => {

        // Verificar que todos los campos sean llenados
        if (
            anticipo === '' ||
            tasa === '' ||
            interes === '' ||
            numCuotas === '' ||
            numFactura === '' ||
            selectedProducto === '' ||
            cantidad === '' ||
            referencia === '' ||
            fechaFacturacion === '' ||
            selectedCliente === ''
        ) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const negociacionActualizada = {
            anticipo,
            tasa,
            interes,
            numCuotas,
            numFactura,
            tipoMaquina: selectedProducto,
            cantidad,
            referencia,
            fechaFacturacion,
            cliente: selectedCliente
        };

        //Petición usando fetch
        try {
            const response = await fetch(`http://localhost:4000/api/negociacion/actualizarNegociacion/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(negociacionActualizada)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Cliente actualizado correctamente
            } else {
                throw new Error('Error al actualizar la negociación');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="d-flex">
                <aside className="">
                    <ul className="d-flex flex-column justify-content-start w-100 px-0 my-0 mx-0">
                        <div className="d-flex justify-content-start align-items-center px-3 py-2">
                            <i className="py-3">
                                <img className="rounded-circle" src="https://e7.pngegg.com/pngimages/164/153/png-clipart-donut-the-simpsons-tapped-out-doughnut-homer-simpson-bart-simpson-krusty-the-clown-donut-food-bagel.png" alt="batman " title="batman" width="40" height="40" />
                            </i>
                            <p className="mb-0 mx-3 text-icon-menu">Nombre</p>
                        </div>
                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="listarClientes.html">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-user-tie mx-4" title="Usuarios"></i>
                                <p className="text-icon-menu my-0">Usuarios</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/admin/listaclientes">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-user mx-4" title="Clientes"></i>
                                <p className="text-icon-menu my-0">Clientes</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/listaproductos">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-box-open mx-4" title="Productos"></i>
                                <p className="text-icon-menu my-0">Productos</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-start py-2 border-bottom border-dark" to="/listanegociaciones">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-sack-dollar mx-4" title="Negociaciones"></i>
                                <p className="text-icon-menu my-0">Negociaciones</p>
                            </div>
                        </Link>
                        <Link className="d-flex justify-content-between py-2 border-bottom border-dark" to="/listaplandepago">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-money-bill-1-wave mx-4" title="Planes de pago"></i>
                                <p className="text-icon-menu my-0">Planes de pago</p>
                            </div>
                        </Link>
                        {/* <Link className="d-flex justify-content-between py-2 border-bottom border-dark" to="listarClientes.html">
                            <div className="d-flex align-items-center">
                                <i className="icon-menu fa-solid fa-book-open mx-4" title="Catálogo"></i>
                                <p className="text-icon-menu my-0">Catálogo de productos</p>
                            </div>
                        </Link> */}
                    </ul>
                </aside>
                <main className="d-flex flex-column">
                    <h1 className="text-center py-0 pt-5 my-0">EDITAR NEGOCIACIÓN</h1>
                    <Link to="/listanegociaciones" style={{ color: 'black', textDecoration: 'none' }}>
                        <div className="controles d-flex align-items-center">
                            <i className="icon-menu fa-solid fa-angles-left"> Volver </i>
                        </div>
                    </Link>
                    <form className="formulario" action="">
                        <div className="contenedores d-flex justify-content-center flex-lg-row flex-column flex-sm-column mx-5 gap-5">
                            <div className="contenedores__div1 d-flex flex-column align-items-center ms-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Anticipo</label>
                                    <input type="number" className="form-control" id="anticipo" aria-describedby="emailHelp" placeholder="anticipo" required value={anticipo} onChange={(e) => { setAnticipo(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Tasa</label>
                                    <input type="number" className="form-control" placeholder="Tasa" required value={tasa} onChange={(e) => { setTasa(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Interes</label>
                                    <input type="number" className="form-control" placeholder="Interes" required value={interes} onChange={(e) => { setInteres(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Número de Cuotas</label>
                                    <select className="form-select" required value={numCuotas} onChange={(e) => { setNumCuotas(e.target.value) }}>
                                        {Array.from({ length: 24 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Número de la Factura</label>
                                    <input type="text" className="form-control" placeholder="Número de la Factura" required value={numFactura} onChange={(e) => { setNumFactura(e.target.value) }} />
                                </div>
                            </div>
                            <div className="contenedores__div2 d-flex flex-column align-items-center me-5 me-sm-0 w-100">
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Seleccionar Productos</label>
                                    <select className="form-select" value={selectedProducto}
                                        onChange={(e) => setSelectedProducto(e.target.value)}>
                                        <option value="">Seleccione un producto</option>
                                        {dataProductos.map((producto) => (
                                            <option key={producto.id} value={producto.id}>
                                                {producto.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cantidad</label>
                                    <input type="number" className="form-control" placeholder="Cantidad" required value={cantidad} onChange={(e) => { setCantidad(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Referencia</label>
                                    <input type="text" className="form-control" placeholder="Referencia" required value={referencia} onChange={(e) => { setReferencia(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Fecha de Facturacion</label>
                                    <input type="date" className="form-control" placeholder="Fecha de Facturacion" required value={fechaFacturacion} onChange={(e) => { setFechaFacturacion(e.target.value) }} />
                                </div>
                                <div className="mb-3 w-100">
                                    <label className="form-label fw-bold">Cliente</label>
                                    <select className="form-select" value={selectedCliente}
                                        onChange={(e) => setSelectedCliente(e.target.value)}>
                                        <option value="">Seleccione un cliente</option>
                                        {dataClientes.map((cliente) => (
                                            <option key={cliente.id} value={cliente.id}>
                                                {cliente.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="contenedor__botones d-flex justify-content-center flex-lg-row flex-column flex-sm-column my-3 mx-5 gap-5">
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones ms-sm-0 w-100">
                                    <button type="submit" className="btn btn-dark w-100 btn-styles" onClick={actualizarNegociacion}>Guardar</button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center w-100">
                                <div className="div_botones me-sm-0 w-100">
                                    <button type="reset" className="btn btn-dark w-100 btn-styles">Limpiar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </section>
        </>
    );
};

export default EditarNegociacion;