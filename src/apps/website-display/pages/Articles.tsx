import { Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { FC, useState } from 'react';
import ArticleCard from 'commons/components/organisms/cards/ArticleCard';
import Layout from 'commons/template/Layout';
import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import { useGetArticlesQuery } from 'apps/website-display/redux/features/article/ArticleSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';

type ArticlesPropsType = {}

const Articles: FC<ArticlesPropsType> = ({ }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: articlesData, isSuccess } = useGetArticlesQuery({ pageNumber, isHidden: false });
  const articles = articlesData?.articles || [];

  return (
    <Layout appbarMode='DASHBOARD'>
      <Grid container spacing={4} justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center'>
            {'مقاله‌ها'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {articles?.map((article, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <ArticleCard article={article} />
            </Grid>
          ))}
          {(isSuccess && articles.length === 0) &&
            <Grid container justifyContent={'center'}>
              <NoDataFound variant={4} />
            </Grid>
          }
        </Grid>
        {(isSuccess && articles.length > 0) &&
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(articlesData.count / ITEMS_PER_PAGE_NUMBER)}
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
