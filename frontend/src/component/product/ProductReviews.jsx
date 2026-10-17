import React from 'react'
import { FiStar, FiCheck, FiThumbsUp } from 'react-icons/fi'

function ProductReviews({
  reviews,
  showReviewForm,
  setShowReviewForm,
  reviewSubmitted,
  newReview,
  setNewReview,
  handleAddReview
}) {
  return (
    <div className="py-8 space-y-10 animate-fade-in">
      {/* Overall Ratings Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Score breakdown */}
        <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start">
          <span className="text-5xl font-extrabold text-[#0c7c86]">4.8</span>
          <div className="flex items-center gap-1 text-amber-400 my-2">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={18} fill="currentColor" />
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Based on {reviews.length + 124} verified ratings
          </p>
        </div>

        {/* Rating bars */}
        <div className="md:col-span-5 space-y-2 text-xs">
          {[
            { stars: '5 Stars', pct: '85%' },
            { stars: '4 Stars', pct: '10%' },
            { stars: '3 Stars', pct: '3%' },
            { stars: '2 Stars', pct: '1%' },
            { stars: '1 Star', pct: '1%' }
          ].map((bar, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-12 text-slate-500">{bar.stars}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div style={{ width: bar.pct }} className="h-full bg-[#0c7c86] rounded-full" />
              </div>
              <span className="w-8 text-right text-slate-500">{bar.pct}</span>
            </div>
          ))}
        </div>

        {/* Write a review button */}
        <div className="md:col-span-3 text-center md:text-right">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-5 py-3 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>
      </div>

      {/* Review Submitted Notice */}
      {reviewSubmitted && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 shadow-xs">
          <FiCheck size={18} className="text-emerald-600" />
          <span>Thank you! Your verified review has been published below.</span>
        </div>
      )}

      {/* Write Review Form */}
      {showReviewForm && (
        <form
          onSubmit={handleAddReview}
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 max-w-2xl animate-fade-in"
        >
          <h4 className="text-slate-900 font-bold text-base">Write Customer Review</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#0c7c86]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-600 font-semibold mb-1">Rating *</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0c7c86]"
              >
                <option value={5}>5 Stars - Outstanding</option>
                <option value={4}>4 Stars - Very Good</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Below Average</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-600 font-semibold mb-1">Review Headline</label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              placeholder="e.g. Great fit and fabric quality"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#0c7c86]"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 font-semibold mb-1">Detailed Review *</label>
            <textarea
              required
              rows={3}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your thoughts on the fit, quality, and style..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#0c7c86] resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0c7c86] hover:bg-[#096068] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0c7c86] to-[#085a62] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{rev.name}</span>
                    {rev.verified && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, idx) => (
                  <FiStar key={idx} size={14} fill="currentColor" />
                ))}
              </div>
            </div>

            <h5 className="text-sm font-bold text-slate-900">{rev.title}</h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {rev.comment}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <button className="flex items-center gap-1.5 hover:text-[#0c7c86] transition-colors cursor-pointer">
                <FiThumbsUp size={13} />
                <span>Helpful ({rev.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductReviews
