import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Url } from '../App';

export default function Addproduct() {
    const url = useContext(Url);
    const [Error, setError] = useState('')
    const [messagecolor, setmessagecolor] = useState('#81ed30')
    const [Addbutton, setAddbutton] = useState(false)
    const [values, setValues] = useState({
        productname: '',
        quantity: 1,
        actualprice: 0,
        sellingprice: 0,
        category: '',
        brand: '',
        description: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const Formsubmit = (e) => {
        e.preventDefault();
        setAddbutton(true)
        // ===================API calling=============
        const token = localStorage.getItem('E-comm_token');
        fetch(url + '/addproduct', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(values)
        }).then((resp) => resp.json())
            .then((res) => {
                if (res.Error) {
                    setmessagecolor('#f10a0a')
                    setError(res.Error);
                }
                else {
                    setError(res.Product);
                    setmessagecolor('#81ed30')
                    setValues({
                        productname: '',
                        quantity: 1,
                        actualprice: 0,
                        sellingprice: 0,
                        category: '',
                        brand: '',
                        description: '',
                    })

                }
            }).catch((err) => {
                setmessagecolor('#f10a0a')
                setError("Something went Wrong, please try again.")
            }).finally(() => {
                setAddbutton(false)
            })
    }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}>
                ADD PRODUCT <AddShoppingCartIcon sx={{ ml: 1 }} />
            </Box>

            <Box
                component="form"
                onSubmit={Formsubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    alignItems: 'center',
                    textAlign: 'center',
                    border: '1px solid grey',
                    borderRadius: '20px',
                    margin: 'auto',
                    maxWidth: '600px',
                    marginTop: '20px',
                    marginBottom: '20px'
                }}
                id='addproductbox'
            >
                <div>
                    <TextField label="Product Name" className='input-field' id="outlined-size-small" size="small" color="secondary" required
                        error={false}
                        helperText=""
                        value={values.productname}
                        onChange={handleChange('productname')} />
                    <TextField id="outlined-number" label="Quantity" size="small" type="number" InputLabelProps={{ shrink: true, }} color="secondary"
                        value={values.quantity}
                        onChange={handleChange('quantity')} />
                </div>
                <div>
                    <TextField label="Actual Price" className='input-field' size="small" type="number" InputLabelProps={{ shrink: true, }} color="secondary"
                        value={values.actualprice}
                        onChange={handleChange('actualprice')}
                    />
                    <TextField id="outlined-number" className='input-field' label="selling Price" size="small" type="number" InputLabelProps={{ shrink: true, }} color="secondary"
                        value={values.sellingprice}
                        onChange={handleChange('sellingprice')} />
                </div>
                <div>
                    <TextField className='input-field' label="Category" size="small" color="secondary" required
                        value={values.category}
                        onChange={handleChange('category')} />
                    <TextField className='input-field' label="Brand/Company" size="small" color="secondary" required
                        value={values.brand}
                        onChange={handleChange('brand')} />
                </div>
                <div className='proddisc'>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        id="outlined-multiline-flexible"
                        className='input-field'
                        label="Product Description"
                        multiline
                        rows={5}
                        fullWidth
                        value={values.description}
                        onChange={handleChange('description')}
                        color="secondary"
                    />
                </div>
                <div>
                    <button type='submit' disabled={Addbutton} style={{ border: 'none', marginBottom: '5px' }}>
                        <Fab variant="extended" color="secondary" disabled={Addbutton}>
                            Add
                            <AddIcon sx={{ ml: 1 }} />
                        </Fab>
                    </button>
                </div>
                <Box sx={{ color: messagecolor }}>{Error}</Box>
            </Box>
        </>
    )
}
