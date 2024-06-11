import PropTypes from 'prop-types'
import StyledComponents from 'styled-components'

export const SearchBar = ({ searchInput, setSearchParams }) => {
    return (
        <SearchBarContainer className='search-bar'>
            <i className='search-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(24,24,24,1)"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
            </i>
            <input
                type='text'
                id='searchInput'
                value={searchInput}
                onChange={(e =>
                    setSearchParams(prev => {
                        prev.set('search', e.target.value)
                        return prev
                    })
                )}
                placeholder='Rechercher'
            />
        </SearchBarContainer>
    )
}

SearchBar.propTypes = {
    searchInput: PropTypes.string.isRequired,
    setSearchParams: PropTypes.func.isRequired
}

const SearchBarContainer = StyledComponents.div`
    height: 40px;
    display: flex;
    width: 100%;
    max-width: 400px;

    .search-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: var(--grey-200);
        border-radius: 8px 0 0 8px;
        border: 1px solid var(--black);
    }

    input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: var(--grey-200);
        border-radius: 0 8px 8px 0;
        border: 1px solid var(--black);
        border-left: none;
        padding: 0 20px 0 10px;
        color: var(--black);
        
        &::placeholder {
            color: var(--grey-600);
        }
    }
`