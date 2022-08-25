<>
  <form className="review-form" onSubmit={handleSubmit}>
    <h1>Add review</h1>
    <label htmlFor="reviewText">Review Text</label>
    <textarea name="reviewText" placeholder="Review text" value={review.reviewText} onChange={handleChange} ></textarea>

    <label htmlFor="rating">rating</label>
    <input type="number" name="rating" placeholder="From 0 to 5" value={review.ratin} onChange={handleChange} />

    <label htmlFor="activities">activities</label>
    <textarea name="activities" placeholder="Activities" value={review.activities} onChange={handleChange} ></textarea>


    <label htmlFor="image">Upload Image</label>
    <input type="file" id="image" className="input" onChange={(event) => {
      setReviewImg(event.target.files[0])
    }} />
    <button onClick={uploadImage}> Upload image</button>

    <input type="submit"/> 
  </form>
</>