// script.js

// 태그 토글 함수 (클라이언트 측에서만 동작)
function toggleTag(button, productId, tag) {
  const productCard = document.querySelector(
    `.product-card[data-product-id="${productId}"]`
  );
  const productTags = JSON.parse(productCard.dataset.productTags);

  // 태그 배열 업데이트
  if (productTags.includes(tag)) {
    productTags.splice(productTags.indexOf(tag), 1); // 태그 제거
  } else {
    productTags.push(tag); // 태그 추가
  }

  // 버튼 active 클래스 토글
  button.classList.toggle("active");

  // 업데이트된 태그 배열을 data-product-tags 속성에 저장
  productCard.dataset.productTags = JSON.stringify(productTags);

  // "태그 저장" 버튼 표시 (선택 사항)
  const updateTagsButton = productCard.querySelector(".update-tags-button");
  updateTagsButton.style.display = "inline-block";
}

// DB 전송 함수 (상품 정보와 태그 정보를 함께 전송)
function sendToDB(productId) {
  const productCard = document.querySelector(
    `.product-card[data-product-id="${productId}"]`
  );
  const productTags = JSON.parse(productCard.dataset.productTags);

  const product = {
    id: productId,
    name: productCard.querySelector(".product-name").textContent,
    price: parseInt(
      productCard
        .querySelector(".product-price")
        .textContent.replace(/[^0-9]/g, "")
    ), // 숫자만 추출
    imageUrl: productCard.querySelector("img").src,
    convini: productCard.querySelector(".product-convini").textContent,
    tags: productTags,
  };

  fetch(`/products/${productId}/send-db`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // 제품 카드 상태 업데이트
        productCard.classList.add("sent");
        productCard.classList.add("duplicate");
        const sendButton = productCard.querySelector(".send-db-button");
        if (sendButton) sendButton.remove();

        // "이미 전송됨" 라벨 추가
        const sentLabel = document.createElement("div");
        sentLabel.classList.add("sent-label");
        sentLabel.textContent = "이미 전송됨";
        productCard.prepend(sentLabel);

        // "이미 DB에 저장된 상품입니다" 라벨 추가
        const duplicateLabel = document.createElement("div");
        duplicateLabel.classList.add("duplicate-label");
        duplicateLabel.textContent = "이미 DB에 저장된 상품입니다";
        productCard.prepend(duplicateLabel);

        // DB에서 삭제 버튼 추가
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-db-button");
        deleteButton.textContent = "DB에서 삭제";
        deleteButton.onclick = () => deleteFromDB(productId);
        productCard.appendChild(deleteButton);

        // "태그 저장" 버튼 숨기기 (선택 사항)
        const updateTagsButton = productCard.querySelector(
          ".update-tags-button"
        );
        updateTagsButton.style.display = "none";
      } else {
        console.error("DB 전송 실패:", data.error);
      }
    })
    .catch((error) => console.error("DB 전송 중 오류 발생:", error));
}

// 태그 업데이트 함수 (선택 사항)
function updateTags(productId) {
  const productCard = document.querySelector(
    `.product-card[data-product-id="${productId}"]`
  );
  const productTags = JSON.parse(productCard.dataset.productTags);

  fetch(`/products/${productId}/tags`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags: productTags }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("태그 업데이트 성공");

        // "태그 저장" 버튼 숨기기
        const updateTagsButton = productCard.querySelector(
          ".update-tags-button"
        );
        updateTagsButton.style.display = "none";
      } else {
        console.error("태그 업데이트 실패:", data.error);
      }
    })
    .catch((error) => console.error("태그 업데이트 중 오류 발생:", error));
}

// DB 삭제 함수 (이전과 동일)
function deleteFromDB(productId) {
  if (!confirm("정말 DB에서 삭제하시겠습니까?")) {
    return; // 취소 버튼 클릭 시 함수 종료
  }

  fetch(`/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // 제품 카드 제거
        const productCard = document.querySelector(
          `.product-card[data-product-id="${productId}"]`
        );
        productCard.remove();
      } else {
        console.error("DB 삭제 실패:", data.error);
      }
    })
    .catch((error) => console.error("DB 삭제 중 오류 발생:", error));
}
