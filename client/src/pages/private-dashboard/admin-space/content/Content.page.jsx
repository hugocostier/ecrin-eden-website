import { Link, useSearchParams } from 'react-router-dom'
import StyledComponents from 'styled-components'
import { storeFrontPages } from '../../../../utils/store-front-content/storeFrontPages.util'

const STOREFRONT_URL = import.meta.env.VITE_APP_CLIENT_URL

export const AdminContent = () => {
    const [searchParams, setSearchParams] = useSearchParams({ page: 'accueil' })
    const selectedPageName = searchParams.get('page')
    const selectedPage = storeFrontPages.find(page => (page.displayedName).toLowerCase() === selectedPageName)

    return (
        <ContentPage>
            <h2>Contenu du site vitrine</h2>

            <ContentContainer>
                <table>
                    <thead>
                        <tr>
                            <th>Pages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeFrontPages.map((page, index) => (
                            <tr key={index}>
                                <td
                                    onClick={() => setSearchParams({ page: (page.displayedName).toLowerCase() })}
                                    className={selectedPageName === (page.displayedName).toLowerCase() ? 'selected' : ''}
                                >
                                    {page.displayedName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedPage && (
                    <PreviewContainer>
                        <iframe src={`${STOREFRONT_URL}${selectedPage.link}`} title={selectedPageName} />
                    </PreviewContainer>
                )}

            </ContentContainer>

            <Link
                to={`/admin/content/update/${selectedPage.id}`}
                className='edit-content'
            >
                Modifier
            </Link>
        </ContentPage>
    )
}

const ContentPage = StyledComponents.main`
    h2 {
        text-align: center; 
    }

    a.edit-content {
        display: inline-block;
        background-color: var(--tertiary-100);
        border: none;
        border-radius: 8px;
        font-size: 16px; 
        font-weight: bold;
        color: var(--black); 
        text-decoration: none; 
        text-align: center;
        letter-spacing: 3px;
        line-height: 1; 
        margin-top: 1rem;
        margin-left: 10%;
        padding: 0.75rem 1rem;
        width: 80%;
        cursor: pointer;

        
        &:hover {
            background-color: var(--tertiary-200);
        }
    }

    @media screen and (min-width: 768px) {
        a.edit-content {
            font-size: 18px; 
            margin-left: 35%;
            width: 30%;
        }
    }

    @media screen and (min-width: 1024px) {
        a.edit-content {
            font-size: 20px; 
            margin-left: 35%;
            width: 30%;
        }
    }
`

const ContentContainer = StyledComponents.section` 
    display: grid; 
    grid-template-columns: 1fr;
    column-gap: 2rem;
    
    table {
        width: 100%;
        border-collapse: collapse;
    }
    
    th, td {
        border: 1px solid var(--primary-200);
        padding: 0.5rem;
        text-align: center;
    }
    
    th {
        background-color: var(--secondary-200);
    }
    
    td {
        cursor: pointer;
        
        &:hover {
            background-color: var(--secondary-100);
        }
    }

    .selected {
        background-color: var(--primary-100);
    
        &:hover {
            background-color: var(--primary-200);
        }
    }

    @media screen and (max-width: 767px) {
        row-gap: 1rem; 

        section {
            height: 80vh;
        }
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 3fr;
        column-gap: 2rem;
        height: 64vh;
    } 

    @media screen and (min-width: 1024px) {
        height: 70vh;
    }
`

const PreviewContainer = StyledComponents.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    iframe {
        width: 100%;
        height: 100%;
    }
`