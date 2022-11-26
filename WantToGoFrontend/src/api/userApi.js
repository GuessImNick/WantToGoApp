export const UserApi = {
    getUserByFirebaseId: async (fbId) => {
        const res = await fetch(`https://localhost:7158/api/User/firebase/${fbId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).catch(null);
        if(res.status === 200) {
            const res1 = await res.json();
            return res1
        }
    },
    createNewUser: async (dbUser) => {
        const res = await fetch('https://localhost:7158/api/User', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dbUser)
        })
    }
}