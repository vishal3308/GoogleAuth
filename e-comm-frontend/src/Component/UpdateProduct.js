import React, { useContext, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Url } from '../App';
import { useParams } from 'react-router';

// =============== Category Section Component===============
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const category_list = ['Electronic', 'AutoMobile', 'Home Product',
    'Game', 'Health', 'Excercise', 'Study', 'Entertainment','Mobile','Bike','TV'].sort();
export default function Addproduct() {
    const url = useContext(Url);
    const token = localStorage.getItem('E-comm_token');
    const { id } = useParams()
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
        productid: id
    });
    // =============First API Calling for Previous Record ============
    useEffect(() => {
        fetch(url + '/productinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ productid: id })
        }).then(resp => resp.json())
            .then((response) => {
                if (response.Error) {
                    setError(response.Error);
                }
                else {
                    setError(0);
                    setValues({
                        productname: response.product.productname,
                        quantity: response.product.quantity,
                        actualprice: response.product.actualprice,
                        sellingprice: response.product.sellingprice,
                        category: response.product.category,
                        brand: response.product.brand,
                        description: response.product.description,
                        productid: id
                    })

                }
            }).catch(err => {
                setError(err.message)
            })
    }, [])
    // ===========================================================
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const Formsubmit = (e) => {
        e.preventDefault();
        setAddbutton(true);
        // ===================API calling for Updating new record=============
        fetch(url + '/updateproduct', {
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
                {Error == 0 ? '' : Error == 1 ?
                    <Alert severity="success" variant="outlined">Product Updated successfully— check it out!</Alert> :
                    <Alert severity="error" variant="outlined">{Error}</Alert>
                }
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    color: '#9b07ad'
                }}>
                UPDATE PRODUCT <AddShoppingCartIcon sx={{ ml: 1 }} color="secondary" />
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
                    <TextField label="Product Id" disabled size="small" color="secondary" defaultValue={values.productid}
                    />
                </div>
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
                <FormControl required sx={{ m: 1, minWidth: 223 }}>
                        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-required-label"
                            id="select-required"
                            value={values.category}
                            label="Category *"
                            onChange={handleChange('category')}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value={"Other"}><em>Other</em></MenuItem>
                            {category_list.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>

                            ))}

                        </Select>
                    </FormControl>

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
                        UPDATE
                        <AddIcon sx={{ ml: 1 }} />
                    </Fab>
                </div>

            </Box>
        </>
    )
}
