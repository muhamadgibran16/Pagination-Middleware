const { Users } = require('../models/model')

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

    // console.log('user => ', user)
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

module.exports = { getUser }