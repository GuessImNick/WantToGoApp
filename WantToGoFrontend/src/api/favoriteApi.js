export const favoriteApi = {
    createNewFavorite: async (favorite) => {
        const res = await fetch('https://localhost:7158/api/Favorite', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(favorite)
        })
    }, 

    deleteFavorite: async (favoriteId) => {
        const res = await fetch(`https://localhost:7158/api/Favorite/${favoriteId}`, {
            method: "DELETE"
        })
    }
}