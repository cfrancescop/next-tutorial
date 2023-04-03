import useSWR from 'swr'

const fetcher = (...args) => fetch(...args)
    .then((res) => res.json());

export function TodoList() {
    const { data, error } = useSWR('http://localhost:3000/giochi', fetcher)
    console.log(data,error);
    if(!data){
        return <h2>Loading...</h2>
    }
    return (
        <ul>
            {data.map( g => (<li key={g.id}>{g.nome}</li>) )}
        </ul>
    )
}