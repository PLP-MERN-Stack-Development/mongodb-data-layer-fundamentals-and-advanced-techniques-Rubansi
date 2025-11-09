// Queries - CRUD operations for a books collection

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "Cal Newport" })

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 17.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "Becoming" })


// AdVanced Queries
// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection - return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sorting by price ascending
db.books.find().sort({ price: 1 })

// Sorting by price descending
db.books.find().sort({ price: -1 })

// Pagination: 5 books per page
// Page 1
db.books.find().limit(5)
// Page 2
db.books.find().skip(5).limit(5)

// Aggregation

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [{ $substr: [{ $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } }, 0, 4] }, "s"] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])


