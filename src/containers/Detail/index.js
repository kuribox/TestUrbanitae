import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { searchOneElementAction } from '../../actions';
import styles from "./detail.module.scss";

const Detail = ({element}) => {
  const { id } = useParams();
  const history = useHistory();

  const errorMsg = useSelector((state) => state.searchReducer.detail.error);
  const loading = useSelector((state) => state.searchReducer.detail.loading);
  const data = useSelector((state) => state.searchReducer.detail.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchOneElementAction({ value: id }))
  }, []);

  return (
    <div className={styles.container}>
      <img
        onClick={() => {
          history.goBack();
        }}
        src="/img/goBack.png"
        className={styles.goBack}
      />

      {
        !loading && errorMsg && (
          <div className={styles.errorMsg}> 
            <span>{errorMsg}</span>
          </div>
        )
      }

      {loading && (
        <Loader
          type="Puff"
          color="#88b04b"
          height={30}
          width={30}
        />
      )}

      {!loading && data && (
        <div className={styles.detailContainer}>
          <div className={styles.image}>
            <img src={data.image} />
          </div>

          <div className={styles.detailContainerData}>
            <div className={styles.element}>
              <span className={styles.title} >Titulo: </span> {data.fullTitle}
            </div>
            <div className={styles.element}>
              <span className={styles.title} >Director/es:</span> {data.directors}
            </div>
            <div className={styles.element}>
              <span className={styles.title} >Generos: </span> {data.genres}
            </div>
            <div className={styles.element}>
              <span className={styles.title} >imDb Rating:</span> {data.imDbRating} / 10
            </div>
            <div className={styles.element}>
              <span className={styles.title} >imDb Votes:</span> {data.imDbRatingVotes}
            </div>

            <div className={styles.element}>
              <span className={styles.title}>Sinopsis:</span> {data.plot}
            </div>
            {data.actorList && (
              <div className={styles.element}>
                <span className={styles.title}>Actores:</span> 
                {data.actorList.map(e => <div key={e.name}>{e.name}</div>)}
              </div>
            )}
          </div>
        </div>
      )} 
    </div>
  )
}

export default Detail;