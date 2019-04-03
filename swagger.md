# Test API Documentation
## Version: 1.0.0

### /products

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query |  | No | integer |
| page | query |  | No | integer |
| pagination | query |  | No | boolean |
| description_length | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /products/search

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| query_string | query |  | Yes | string |
| limit | query |  | No | integer |
| page | query |  | No | integer |
| pagination | query |  | No | boolean |
| description_length | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /products/{id}

#### GET
##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /shoppingcart/generate-unique-id

#### GET
##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /products/in-category/{category_id}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| category_id | path |  | Yes | number |
| limit | query |  | No | integer |
| page | query |  | No | integer |
| pagination | query |  | No | boolean |
| description_length | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /products/in-department/{department_id}

#### GET
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| department_id | path |  | Yes | number |
| limit | query |  | No | integer |
| page | query |  | No | integer |
| pagination | query |  | No | boolean |
| description_length | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /customers

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Model 1](#model-1) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

#### PUT
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Model 4](#model-4) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /customers/login

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Model 2](#model-2) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /shoppingcart/add

#### POST
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Model 3](#model-3) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### Models


#### Model 1

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| email | string |  | Yes |
| password | string |  | Yes |

#### Model 2

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string |  | Yes |
| password | string |  | Yes |

#### Model 3

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| cart_id | string |  | Yes |
| product_id | number |  | Yes |
| attributes | string |  | Yes |
| quantity | number |  | Yes |

#### Model 4

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| email | string |  | Yes |
| password | string |  | No |
| day_phone | string |  | No |
| eve_phone | string |  | No |
| mob_phone | string |  | No |