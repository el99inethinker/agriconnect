'use client'
import {useState}from 'react'
import {supabase} from '../../lib/supabaseClient'
export default function AddListingPage(){
    const[form, setForm]=useState({
        name: '', commodity:'', form:'', location:'', 
        capacity_mt:'', cadence:'', moisture:'', cert:'', port:'', contact:''
    })
    const [status, setStatus]=useState(null)
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }
    async function handleSubmit(e){
        e.preventDefault()
        if(!form.name|| !form.commodity|| !form.contact) {
            setStatus('Please fill in at least your name, commodity, and phone/WhatsApp contact.')
            return
        }
        setStatus('saving')
        const{error}= await supabase.from('listings').insert([{
            ...form,
            capacity_mt: parseFloat(form.capacity_mt)|| 0
        }])
        if (error){
            console.error(error)
            setStatus('error:' + error.message)
        }else{
            setStatus('saved!')
            setForm({name:'', commodity:'', form:'', location:'', capacity_mt:'', cadence:'', moisture:'', cert:'', port:'', contact:''})
        }
    }
    return(
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 40, fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{fontSize: 26, marginBottom: 20 }}>Add Your Supply</h1>
            <p style={{fontSize: 13, color: '#888', marginBottom: 16}}>
                Your details, including your phone/WhatsApp number, will be visible to anyone using this site.
                </p>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                <input name="name" placeholder="Farm/network name" value={form.name} onChange={handleChange} style={inputStyle} />
                <input name="commodity" placeholder="Commodity (e.g. Cassava)" value={form.commodity} onChange={handleChange} style={inputStyle} />
                <input name="form" placeholder="Form (e.g. Garri, Fresh, Chips)" value={form.form} onChange={handleChange} style={inputStyle} />
                <input name="location" placeholder="Location" value={form.location} onChange={handleChange} style={inputStyle} />
                <input name="capacity_mt" placeholder="Capacity (tons/month)" value={form.capacity_mt} onChange={handleChange} style={inputStyle} />
                <input name="cadence" placeholder="Cadence (e.g. monthly)" value={form.cadence} onChange={handleChange} style={inputStyle} />
                <input name="moisture" placeholder="Moisture spec (optional)" value={form.moisture} onChange={handleChange} style={inputStyle} />
                <input name="cert" placeholder="Certification (optional)"value={form.cert} onChange={handleChange} style={inputStyle} />
                <input name="port" placeholder="Nearest port" value={form.port} onChange={handleChange} style={inputStyle} />
                <input name="contact" placeholder="Phone/WhatsApp number" value={form.contact} onChange={handleChange} style={inputStyle} />
                <button type="submit" style={buttonStyle}>Save Listing</button>
                </form>
                {status && <p style={{ marginTop: 16 }}>{status}</p>}
                </div>
    )
}
const inputStyle= {
    padding: 12,
    fontSize: 15,
    border: '1px solid #ccc',
    borderRadius: 6,
}
const buttonStyle= {
    padding: 12,
    fontSize: 16,
    background: '#2F4A3C',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: 6,
}


