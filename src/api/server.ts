let token = `a6d1d9519f6f5e751831a08190810e9975282015bcbb522b`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://low-purple-starfish.glitch.me/api/plants`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data:any) => {
        const response = await fetch(`https://low-purple-starfish.glitch.me/api/plants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to create new data on server')
        }

        return await response.json()
    },

    update: async (id:string, data:any) => {
        const response = await fetch(`https://low-purple-starfish.glitch.me/api/plants/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },

    delete: async(id:string) => {
        const response = await fetch(`hhttps://low-purple-starfish.glitch.me/api/plants/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}