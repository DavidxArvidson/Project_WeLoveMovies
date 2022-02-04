const knex = require("../db/connection");

function listCritics(criticId) {
  return knex("critics")
    .where({ "critic_id": criticId })
    .first();
}

async function setCritic(review) {
  review.critic = await listCritics(review.critic_id);
  return review;
}

function list(movie_id) {
  return knex("reviews")
    .where({ "movie_id": movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

function read(id) {
  return knex("reviews")
    .where({ "review_id": id })
    .first();
}

function update(updatedReview) {
  return knex("reviews")
    .where({ "review_id": updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => read(updatedReview.review_id))
    .then(setCritic);
}

function destroy(id) {
  return knex("reviews")
    .where({ "review_id": id })
    .del();
}

module.exports = {
  destroy,
  list,
  read,
  update,
};