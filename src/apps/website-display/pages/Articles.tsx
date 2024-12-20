import { Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { FC, useState } from 'react';
import ArticleCard from 'commons/components/organisms/cards/ArticleCard';
import Layout from 'commons/template/Layout';

import { ITEMS_PER_PAGE_NUMBER } from 'commons/configs/Constants';
import { useGetArticlesQuery } from 'apps/website-display/redux/features/article/ArticleSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';

type ArticlesPropsType = {}

const Articles: FC<ArticlesPropsType> = ({ }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isSuccess } = useGetArticlesQuery({ pageNumber });
  const articles = data?.articles || [];
  const count = data?.count || 0;

  const visibleArticles = articles.filter(article => !article.is_hidden)

  return (
    <Layout appbarMode='DASHBOARD'>
      <Grid container spacing={4} justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center'>
            {'مقاله‌ها'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {visibleArticles?.map((article, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <ArticleCard article={article} mode='view' />
            </Grid>
          ))}
          {(isSuccess && visibleArticles.length === 0) &&
            <Grid container justifyContent={'center'}>
              <NoDataFound variant={4} />
            </Grid>
          }
        </Grid>
        {(isSuccess && visibleArticles.length > 0) &&
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(count / ITEMS_PER_PAGE_NUMBER)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>
        }
      </Grid>
    </Layout>
  );
};

export default Articles;
