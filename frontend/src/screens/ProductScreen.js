import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions.js';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history , match }) => {
  //? product quantity
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match.params.id, dispatch]);

  const addToCartHandler = ()=>{  
    history.push(`/cart/${match.params.id}?qty=${qty}`)

  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col className = 'product-page-section' md={6}  >
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>

          <Col  md={3} className = 'product-page-section'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.newReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col className = 'product-page-section' md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col className = 'product-page-section'  >Price :</Col>
                    <Col className = 'product-page-section'>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className = 'product-page-section' >Status:</Col>
                    <Col className = 'product-page-section' >
                      {product.countInStock ? 'In stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock === 0 ? null :  (
                  <ListGroup.Item>
                    <Row>
                      <Col className = 'product-page-section'>Quantity:</Col>
                      <Col className = 'product-page-section'>
                        <Form.Control 
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x)=>(
                            <option key = {x+1} value= {x+1}>{x+1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                  onClick = {addToCartHandler}
                    className='btn btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
