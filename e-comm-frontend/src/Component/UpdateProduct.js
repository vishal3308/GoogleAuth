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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Url } from '../App';
import { useParams } from 'react-router';
const axios = require('axios')

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
    'Game', 'Health', 'Excercise', 'Study', 'Entertainment', 'Mobile', 'Bike', 'TV'].sort();
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
    const [APIimagesURL, setAPIImagesURL] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);
    const [imageStatus,setimageStatus]=useState(false)
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
                    setAPIImagesURL(response.product.images)

                }
            }).catch(err => {
                setError(err.message)
            })
    }, [imageStatus])
    // ===========================================================
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const DeleteImageAPI = (ImgName,index) => {
        let info = {
            image: ImgName,
            productid: id
        }
        axios({
            method: 'post',
            url: url + '/deleteproduct_image',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: info
        }).then(response => {
            let res=response.data;
            if(res.Error){
                console.log(res.Error)
            }
            else{
                setError(1);
                setimageStatus(!imageStatus)
                setAPIImagesURL((prev)=>prev.slice(index,1))
            }
        }).catch((err) => {
            console.log(err.message)
        }).finally(() => {
            console.log('APIimage: ',APIimagesURL)
        })
    }
    // ========= Local Image Handling which User Upload===========
    const handleimages = (e) => {
        setError(0)
        let files = [...e.target.files];
        console.log(images.length + files.length)
        if (images.length + files.length > 5) {
            setError('Maximum 5 images are allow.');
            return;
        }
        setImages([...images, ...files])
        new Promise((res, rej) => {
            let result = [];
            files.map(element => { return result.push(URL.createObjectURL(element)) })
            res(result);
        }).then(res => {
            setImagesURL([...imagesURL, ...res]);
        }
        )
    }
    const deleteImage = (index) => {
        let Imagelist = images;
        Imagelist.splice(index, 1)
        setImages([...Imagelist])
        Imagelist = imagesURL;
        Imagelist.splice(index, 1)
        setImagesURL([...Imagelist])
    }
    // ===================API calling for Updating new record=============
    const Formsubmit = (e) => {
        e.preventDefault();
        setAddbutton(true);
        const formData = new FormData();
        console.log(images)
        images.map(img => {
            formData.append('file', img);
        })
        for (const key in values) {
            formData.append(key, values[key]);
        }
        axios({
            method: 'post',
            url: url + '/updateproduct',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            },
            data: formData
        }).then((response) => {
            let res = response.data;
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
            <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'center', }}>
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
                <div className="product_image">
                    <span>Previous Images</span>
                    <input type="file" name="Product_image" multiple accept='image/*' onChange={(e) => handleimages(e)} />

                </div>
                <div className="show_image">
                    {APIimagesURL.map((imgName, index) => (
                        <div className="image_box" key={index}>
                            <div className='imagecard'>
                                <img src={'http://localhost:4000/' + imgName} alt={"product" + index} height="150" />
                                <div className="prod_delete_button">
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete" size="large" onClick={() => DeleteImageAPI(imgName,index)} >
                                            <DeleteIcon sx={{ color: 'red' }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    ))}
                    {imagesURL.map((imgName, index) => (
                        <div className="image_box" key={index}>
                            <div className='imagecard'>
                                <img src={imgName} alt={"product" + index} height="150" />
                                <div className="prod_delete_button">
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete" size="large" onClick={() => deleteImage(index)} >
                                            <DeleteIcon sx={{ color: 'red' }} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    ))}
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
