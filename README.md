# Pagination Middleware

This is a middleware function for implementing pagination in a Node.js application. It extracts the page number and data size from the request query parameters, calculates the offset for the database query, and generates the pagination links for the response.

### Usage
1. Import the middleware function into your Node.js application:
```js
const { Pagination } = require('../middleware/pagination')

```
2. Apply the middleware to the desired route or routes:
```js
router.use(Pagination)

router.get('/your-route', your_controller)
```
3. Access the pagination information in your route controller:
```js
  // Access pagination properties
    const pagination = res.pagination
    const { page, perPage, offset } = pagination

  // Use the pagination properties in your database query or response handling
  // Example:
  // const results = await YourModel.find().skip(offset).limit(perPage);

  // Example usage of pagination links in the response
    const totalPages = Math.ceil(count / perPage)
    pagination.hasNextPage = page < totalPages
    pagination.hasPreviousPage = page > 1
    pagination.nextPage = page + 1
    pagination.previousPage = page - 1

    res.status(200).json({
      success: true,
      payload: user, // your payload
      pagination: {
        page,
        perPage,
        totalItems: count,
        totalPages,
        previousLink: pagination.getPreviousLink(),
        nextLink: pagination.getNextLink(),
      },
    })
```

### Request Parameters

The pagination middleware uses the following query parameters in the request URL:
- ```page```: The page number to retrieve. Defaults to 1.
- ```size```: The number of items per page. Defaults to 10.

### Response Properties

The pagination middleware adds the following properties to the response object (res.pagination):

- ```page```: The current page number.
- ```perPage```: The number of items per page.
- ```offset```: The offset value for the database query.
- ```hasNextPage```: A boolean indicating if there is a next page.
- ```hasPreviousPage```: A boolean indicating if there is a previous page.
- ```nextPage```: The page number for the next page.
- ```previousPage```: The page number for the previous page.
- ```getPreviousLink()```: A function that returns the link for the previous page. Returns null if there is no previous page.
- ```getNextLink()```: A function that returns the link for the next page. Returns null if there is no next page.

### Example Usage
Assuming you have an Express.js application and you want to implement pagination for a specific controller:
```js
const getUser = async (req, res, next) => {
  try {
    const pagination = res.pagination
    const { page, perPage, offset } = pagination

    const { count, rows: user } = await Users.findAndCountAll({
      attributes: ['uid', 'name', 'email', 'telp', 'address', 'ttl', 'gender', 'photo'],
      limit: perPage,
      offset: offset,
    })

    const totalPages = Math.ceil(count / perPage)
    pagination.hasNextPage = page < totalPages
    pagination.hasPreviousPage = page > 1
    pagination.nextPage = page + 1
    pagination.previousPage = page - 1

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found!'
      })
    }

    res.status(200).json({
      success: true,
      payload: user,
      pagination: {
        page,
        perPage,
        totalItems: count,
        totalPages,
        previousLink: pagination.getPreviousLink(),
        nextLink: pagination.getNextLink(),
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}
```
---

With this setup, you can make requests to /your-route with the page and size query parameters to retrieve paginated results and get the corresponding pagination information in the response.

Feel free to customize the middleware or response format according to your application's requirements.