import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import "../../../css/custom.css";
import Header from "./Header";

const PROVIDER_PER_PAGE = 20;
const PAGE_WINDOW = 5;


function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];
  const [currentPage, setCurrentPage] = useState(1);

  if (!results.length) {
    return (
      <Container className="mt-4 text-center">
        <h5>No providers found</h5>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>
    );
  }

  const totalPages = Math.ceil(results.length / PROVIDER_PER_PAGE);
  const startIndex = (currentPage - 1) * PROVIDER_PER_PAGE;
  const currentResults = results.slice(
    startIndex,
    startIndex + PROVIDER_PER_PAGE
  );

  const goToDetails = (item) => {
    navigate(`/patient/providers/details/${item.provider?.id}`, {
      state: { provider: item }
    });
  };

  const addToList = (e, providerId) => {
    e.stopPropagation();
    console.log("Added to list:", providerId);
  };

  return (
    <>
      <Header />

      <Container className="mt-4">
        <div className="provider-grid">
          {currentResults.map((item, index) => (
            <Card
              key={index}
              className="provider-card clickable-card text-center"
              onClick={() => goToDetails(item)}
            >
              <div className="add-to-list-top">
                <Button
                  className="btn-outline-custom-green"
                  size="sm"
                  onClick={(e) => addToList(e, item.provider?.id)}
                >
                  <i className="bi bi-plus"></i> Add to List
                </Button>
              </div>

              <div className="provider-image-wrapper">
                <img
                  src={
                    item.profileImage?.imageUrl ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="provider"
                  className="provider-image"
                />
              </div>

              <Card.Body>
                <h6 className="provider-name">
                  {item.details?.clinicianName}
                </h6>

                <div className="provider-actions">
                  <i className="bi bi-envelope"></i> {item.provider?.email}
                </div>

                <div className="provider-actions">
                  <i className="bi bi-telephone"></i> {item.provider?.phone}
                </div>

                <div className="provider-info">
                  <div>
                    <i className="bi bi-briefcase"></i>{" "}
                    {item.details?.levelOfTreatment}
                  </div>
                  <div>
                    <i className="bi bi-geo-alt"></i>{" "}
                    {item.address?.city}, {item.address?.state}{" "}
                    {item.address?.zip}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination-container">
          <Button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          {(() => {
            let startPage = Math.max(1, currentPage);
            let endPage = startPage + PAGE_WINDOW - 1;

            if (endPage > totalPages) {
              endPage = totalPages;
              startPage = Math.max(1, endPage - PAGE_WINDOW + 1);
            }

            return Array.from(
              { length: endPage - startPage + 1 },
              (_, i) => startPage + i
            ).map((page) => (
              <Button
                key={page}
                className={`pagination-btn ${
                  currentPage === page ? "active-page" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ));
          })()}

          <Button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>

      </Container>
    </>
  );
}

export default SearchResults;
