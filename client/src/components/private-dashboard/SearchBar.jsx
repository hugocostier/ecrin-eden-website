import PropTypes from 'prop-types';
import StyledComponents from 'styled-components';

export const SearchBar = ({ searchInput, setSearchParams }) => {
    return (
        <SearchBarContainer className='search-bar'>
            <input
                type="text"
                id="searchInput"
                value={searchInput}
                onChange={(e) => setSearchParams({ search: e.target.value })}
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

    input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: var(--grey-200);
        border-radius: 8px;
        border: 1px solid var(--black);
        padding: 0 20px 0 40px;
        box-shadow: 0 0 0 2px rgb(134 140 160 / 2%);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23717790c7'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
        background-size: 18px;
        background-repeat: no-repeat;
        background-position: 16px 48%;
        color: var(--black);
        
        &::placeholder {
            color: var(--grey-600);
        }
    }
`