'use client'
import{useEffect, useState} from 'react'
import{supabase} from '../lib/supabaseClient'
export default function Homepage(){
  const [listings, setListings]= useState([])
  const [search, setSearch]= useState('')
  const [loading, setLoading]= useState(true)
  useEffect(() => {
    async function fetchListings (){
      const{data, error}= await supabase.from('listings').select('*')
      if (!error) setListings(data)
        setLoading(false)
    }
    fetchListings()
  }, [])
  const filtered= listings.filter((item)=>{
    const text= search.toLowerCase()
    return(
      item.commodity?.toLowerCase(). includes(text) ||
      item.location?.toLowerCase().includes(text) ||
      item.form?.toLowerCase().includes(text)
    )
  })
  return(
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{ fontSize: 28, marginBottom: 6}}>Find a Supplier</h1>
      <p style={{color: '#666', marginBottom: 24 }}>
        Search by commodity, form, or location (e.g. "cassava", "garri", "Benue")
        </p>
        <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          border: '1px solid #ccc',
          borderRadius: 6,
          marginBottom: 24,
        }}
        />
        {loading && <p>Loading...</p>}
        {!loading && filtered.length === 0 && (
          <p style={{ color: '#999' }}> No matching suppliers found.</p>
        )}
        {filtered.map((item)=> (
          <div
          key={item.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
          }}
          >
            <h3 style={{ margin: '0 0 6px'}}>{item.name}</h3>
            <p style={{ margin: '2px 0'}}><b>Commodity:</b>{item.commodity}-{item.form}</p>
            <p style={{ margin: '2px 0'}}><b>Location:</b>{item.location}</p>
            <p style={{ margin: '2px 0'}}><b>Capacity:</b>{item.capacity_mt} MT,{item.cadence}</p>
            <p style={{ margin: '2px 0'}}><b>Certification:</b>{item.cert}</p>
            <p style={{ margin: '2px 0'}}><b>Ships from:</b>{item.port}</p>
            </div>
        ))}
        </div>
  )
}
            

