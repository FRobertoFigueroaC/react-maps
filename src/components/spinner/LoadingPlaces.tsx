import React from 'react'

export const LoadingPlaces = () => {
  return (
    <div className="container bg-secondary py-2">
        <div className="row justify-content-center">
          <div className="col-4 offset-3">
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
  )
}
