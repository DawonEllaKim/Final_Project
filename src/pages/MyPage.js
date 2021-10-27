import React from "react";
import styled from "styled-components";

const MyPage = () => {
  return (
    <div>
      <div>
        WELCOME
        <button>edit</button>
      </div>
      <Body>
        <Dog>
          <Image />
          <OwnerInfo>
            <div>
              강아지 이름
              <input />
            </div>
            <div>
              성별
              <input type="radio" />
              <input type="radio" />
            </div>
            <div>
              견종
              <select>
                <option>비숑</option>
              </select>
            </div>
            <div>
              나이
              <select>
                <option>20대</option>
              </select>
            </div>
            <div>
              중성화 여부
              <input type="radio" />
              <input type="radio" />
            </div>
            <div>
              강아지 한줄평
              <input />
            </div>
          </OwnerInfo>
        </Dog>
        <Owner>
          <Image />
          <OwnerInfo>
            <div>
              보호자이름
              <input />
            </div>
            <div>
              성별
              <input type="radio" />
              <input type="radio" />
            </div>
            <div>
              나이
              <select>
                <option>20대</option>
              </select>
            </div>
            <div>
              산책지역
              <input />
            </div>
          </OwnerInfo>
        </Owner>
      </Body>
      <div>
        <button>변경하기</button>
      </div>
    </div>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;
const Dog = styled.div`
  display: flex;
  flex-direction: row;
`;
const Owner = styled.div`
  display: flex;
  flex-direction: row;
`;
const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
`;

export default MyPage;
