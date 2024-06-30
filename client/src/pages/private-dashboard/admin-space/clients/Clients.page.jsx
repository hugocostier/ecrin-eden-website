import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import StyledComponents from 'styled-components'
import { SearchBar } from '../../../../components/private-dashboard/SearchBar'
import { deleteClient, fetchClients } from '../../../../data/admin/clients.fetch'

export const AdminClients = () => {
    const [clients, setClients] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({ search: '' })
    const searchInput = searchParams.get('search')

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Êtes vous sur de vouloir supprimer ce client ?')

        if (confirmDelete) {
            toast.promise(deleteClient(id), {
                pending: 'Suppression...',
                success: 'Client supprimé !',
                error: 'Erreur lors de la suppression client'
            }, { containerId: 'notification' })
                .then(() => {
                    setClients(clients.filter(client => client.id !== id))
                })
                .catch(error => {
                    console.error('Error deleting client:', error)
                })
        }

        return
    }

    useEffect(() => {
        fetchClients()
            .then(fetchedClients => {
                setClients(fetchedClients)
            })
            .catch(error => {
                console.error('Error fetching clients:', error)
            })

        return () => {
            setClients([])
        }
    }, [])

    const filteredClients = useMemo(() => {
        return clients.filter(client => client.first_name.toLowerCase().includes(searchInput.toLowerCase()) || client.last_name.toLowerCase().includes(searchInput.toLowerCase()))
    }, [clients, searchInput])

    return (
        <ClientPage>
            <h2>Mes clients</h2>

            <ActionSection>
                <Link to={'add'} className='btn add-client'>Ajouter un client</Link>

                <SearchBar searchInput={searchInput} setSearchParams={setSearchParams} />
            </ActionSection>

            {filteredClients.length === 0 ? (
                <h3>Aucun client trouvé</h3>
            ) :
                <section className='clients-list'>
                    <ClientsTable>
                        <thead>
                            <tr>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Téléphone</th>
                                <th>Adresse</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.first_name}</td>
                                    <td>{client.last_name}</td>
                                    <td><a href={`tel:${client.phone_number}`}>{client.phone_number}</a></td>
                                    <td>{client.address && `${client.address}, ${client.postal_code} ${client.city}`}</td>
                                    <td className='table-action'>
                                        <Link to={`${client.id}`} state={{ disable: true }}>
                                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M22 20V7L20 3H4L2 7.00353V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20ZM4 9H20V19H4V9ZM5.236 5H18.764L19.764 7H4.237L5.236 5ZM15 11H9V13H15V11Z'></path></svg>
                                        </Link>
                                        <Link to={`update/${client.id}`} state={{ disable: false }}>
                                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M3 6H21V18H3V6ZM2 4C1.44772 4 1 4.44772 1 5V19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19V5C23 4.44772 22.5523 4 22 4H2ZM13 8H19V10H13V8ZM18 12H13V14H18V12ZM10.5 10C10.5 11.3807 9.38071 12.5 8 12.5C6.61929 12.5 5.5 11.3807 5.5 10C5.5 8.61929 6.61929 7.5 8 7.5C9.38071 7.5 10.5 8.61929 10.5 10ZM8 13.5C6.067 13.5 4.5 15.067 4.5 17H11.5C11.5 15.067 9.933 13.5 8 13.5Z'></path></svg>
                                        </Link>
                                        <Link onClick={() => handleDelete(client.id)}>
                                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z'></path></svg>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </ClientsTable>
                </section>
            }
        </ClientPage>
    )
}

const ClientPage = StyledComponents.main`
    .btn {
        &.add-client {
            padding: 10px 20px;
            border-radius: 10px;
            text-transform: none;  
        }
    }

    .clients-list {
        overflow-x: auto;
    }

    @media screen and (max-width: 768px) {
        h2 { 
            text-align: center; 
        }
    }
`

const ActionSection = StyledComponents.section`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`

const ClientsTable = StyledComponents.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px; 
    margin-top: 20px;
    user-select: none;

    thead {
        background-color: #f4f4f4;
    }
    
    tbody {
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:nth-child(odd) {
            background-color: #ffffff;
        }
    }

    tr {
        th, td {
            padding: 10px;
            text-align: left;
            vertical-align: middle; 
        }
    
        td {
            text-transform: capitalize;

            a {
                text-decoration: none;
                color: inherit;
        
                &:hover:not(.table-action) {
                    text-decoration: underline;
                }
            }

            &.table-action {        
                a {
                    display: inline-block;
                    width: 1.5rem;
                    height: 1.5rem;

                    &:not(:last-child) {
                        margin-right: 10px;
                    }
        
                    svg {
                        width: 100%;
                        height: 100%;
                        fill: currentColor;
                    }
        
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }   
        }
    }

    @media screen and (max-width: 768px) {
        th, td {
            &:nth-child(1), 
            &:nth-child(2) {
                min-width: 100px;
            }

            &:nth-child(4) {
                min-width: 250px;
            }

            &:nth-child(3),
            &:nth-child(5) {
                min-width: 120px;
            }
        }
    }

    @media screen and (min-width: 768px) {
        th, td {
            &:nth-child(1), 
            &:nth-child(2) {
                width: 15%;
            }

            &:nth-child(3) {
                width: 20%;
            }

            &:nth-child(5) {
                width: 120px;
            }
        }
    } 
`