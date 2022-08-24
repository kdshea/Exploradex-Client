




const Review = () => {
  <div>
  <h1>Add Review</h1>

  <form id="feedback" action="">
  <div className="pinfo">Your Review</div>
  
  <div className="form-group">
    <div className="input-group">
    <div className="pinfo">Rate our overall services.</div>
    <select className="form-control" id="rate">
        <option value="1star">1</option>
        <option value="2stars">2</option>
        <option value="3stars">3</option>
        <option value="4stars">4</option>
        <option value="5stars">5</option>
      </select>
      </div>
    </div>

  <div className="form-group">
    <div className="col-md-4 inputGroupContainer">
    <div className="pinfo">Write your feedback.</div>
    <textarea className="form-control" id="review" rows="7"></textarea>
      </div>
    </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
}


export default Review