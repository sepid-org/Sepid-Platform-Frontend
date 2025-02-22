import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { toast } from 'react-toastify';
import ArticleInfoForm from '../forms/ArticleInfoForm';
import { useCreateArticleMutation } from 'apps/website-display/redux/features/article/ArticleSlice';
import { ArticleType } from 'commons/types/redux/article';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';

type CreateArticleDialogPropsType = {
  open: boolean;
  handleClose: any;
}

const CreateArticleDialog: FC<CreateArticleDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const t = useTranslate();
  const { data: website } = useGetWebsiteQuery();
  const [createArticle, result] = useCreateArticleMutation()
  const [properties, setProperties] = useState<Partial<ArticleType>>({
    name: '',
    description: '',
    cover_image: 'https://kamva-minio-storage.darkube.app/sepid/fsm-placeholder-image.png',
    is_hidden: false,
    tags: [],
  });

  const handleCreateArticle = () => {
    if (!properties.name) {
      toast.error('لطفاً نام مقاله را انتخاب کنید.');
      return;
    }
    if (!properties.description) {
      toast.error('لطفاً توضیحات مقاله را بنویسید.');
      return;
    }
    createArticle({
      website: website.name,
      ...properties
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('مقاله با موفقیت ساخته شد.');
      handleClose(false);
      setProperties({
        name: '',
        description: '',
        cover_image: 'https://kamva-minio-storage.darkube.app/sepid/fsm-placeholder-image.png',
        is_hidden: false,
        tags: [],
      });
    }
  }, [result])

  return (
    <Dialog disableScrollLock open={open} maxWidth="md">
      <DialogTitle>{'ایجاد مقاله جدید'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems={'start'}>
          <Grid item>
            <Typography gutterBottom>
              {'مشخصات مقاله را وارد کنید:'}
            </Typography>
          </Grid>
          <Grid item>
            <ArticleInfoForm data={properties} setData={setProperties} showCoverImage={true} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClose();
            setProperties({
              name: '',
              description: '',
              cover_image: 'https://kamva-minio-storage.darkube.app/sepid/fsm-placeholder-image.png',
              is_hidden: false,
              tags: [],
            });
          }}>
          {'انصراف'}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateArticle}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateArticleDialog;