'use client'
import{useEffect, useState} from 'react'
import{supabase} from'../../lib/supabaseClient'
export default function TestPage(){
    const[listings, setListings]=useState([])
    const[error, setError]=useState(null)
    useEffect(()=>{
        async function fetchListings(){
            const{data, error}= await supabase.from('listings').select('*')
            if(error){
                console.error(error)
                setError(error.message)
            }else{
                console.log('Listings from Supabase:',data)
                setListings(data)
            }
        }
        fetchListings()
    },[])
    return(
        <div style={{padding:40}}>
            <h1>Supabase connection test</h1>
            {error && <p style={{color:'red'}}>Error:{error}</p>}
            <p>Found{listings.length} listing(s).</p>
            <pre>{JSON.stringify(listings, null, 2)}</pre>
            </div>
    )
}