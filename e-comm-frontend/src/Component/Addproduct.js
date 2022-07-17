import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Alert from '@mui/material/Alert';

import { Url } from '../App';

export default function Addproduct() {
    const url = useContext(Url);
    const [Error, setError] = useState(0)
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
// ===================API calling for Adding New Product=====================
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
                    setError(res.Error);
                }
                else {
                    setError(1);
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
                setError(err.message)
            }).finally(() => {
                setAddbutton(false)
            })
    }
    return (
        <>
        <div style={{ marginTop: '5px',display: 'flex', justifyContent: 'center', }}>
                {Error === 0 ? '' : Error === 1 ?
                    <Alert severity="success" variant="outlined">Product Added successfully— check out Product List</Alert> :
                    <Alert severity="error" variant="outlined">{Error}</Alert>
                }
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    color:'#9b07ad'
                }}>
                ADD PRODUCT <AddShoppingCartIcon sx={{ ml: 1 }} color="secondary"/>
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
                    <TextField label="Product Name" id="outlined-size-small" size="small" color="secondary" required
                        error={false}
                        helperText=""
                        value={values.productname}
                        onChange={handleChange('productname')} />
                    <TextField id="outlined-number" label="Quantity" size="small" type="number" required InputLabelProps={{ shrink: true, }} color="secondary"
                        value={values.quantity}
                        onChange={handleChange('quantity')} />
                </div>
                <div>
                    <TextField label="Actual Price" size="small" type="number" InputLabelProps={{ shrink: true, }} color="secondary" required
                        value={values.actualprice}
                        onChange={handleChange('actualprice')}
                    />
                    <TextField label="selling Price" size="small" type="number" InputLabelProps={{ shrink: true, }} color="secondary" required
                        value={values.sellingprice}
                        onChange={handleChange('sellingprice')} />
                </div>
                <div>
                    <TextField label="Category" size="small" color="secondary" required
                        value={values.category}
                        onChange={handleChange('category')} />
                    <TextField label="Brand/Company" size="small" color="secondary" required
                        value={values.brand}
                        onChange={handleChange('brand')} />
                </div>
                <div className='proddisc'>
                    <TextField
                        sx={{ width: '100%' }}
                        required
                        id="outlined-multiline-flexible"
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
                        <Fab variant="extended" color="secondary" disabled={Addbutton} type='submit'>
                            ADD
                            <AddIcon sx={{ ml: 1 }} />
                        </Fab>
                </div>
                
            </Box>
        </>
    )
}
