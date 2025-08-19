import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

const TrainingFeedback = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Post-Training Feedback</h1>
      <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <h2 className="card-title">Feedback for: React Advanced Concepts</h2>
          <p className="text-sm text-gray-500">Your feedback is valuable for improving our training programs.</p>
          <form className="space-y-6 mt-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Trainer Rating</span></label>
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map(star => (
                  <input key={star} type="radio" name="trainer-rating" className="mask mask-star-2 bg-orange-400" />
                ))}
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Session Quality</span></label>
              <select className="select select-bordered">
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Usefulness of Content</span></label>
              <select className="select select-bordered">
                <option>Very Useful</option>
                <option>Somewhat Useful</option>
                <option>Not Useful</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Comments & Suggestions</span></label>
              <textarea className="textarea textarea-bordered h-24" placeholder="What did you like? What can be improved?"></textarea>
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrainingFeedback;
