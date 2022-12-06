export const UserApi = {
    getUserByFirebaseId: async (fbId, token) => {
        const res = await fetch(`https://localhost:7158/api/User/firebase/${fbId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).catch(null);
        if(res.status === 200) {
            const res1 = await res.json();
            return res1
        }
    },
    getUserById: async (id, token) => {
        const res = await fetch(`https://localhost:7158/api/User/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).catch(null);
        if(res.status === 200) {
            const res1 = await res.json();
            return res1
        }
    },
    createNewUser: async (dbUser, token) => {
        const res = await fetch('https://localhost:7158/api/User', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dbUser)
        })
    }
}