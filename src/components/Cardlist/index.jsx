import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, ResponsiveGrid, Divider, Typography, Icon, Loading } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios'
import qs from 'qs'


const {
  Group: TagGroup,
  Selectable: SelectableTag
} = Tag;
const {
  Cell
} = ResponsiveGrid;
const DEFAULT_DATA = {
  tagsA: ['类目一', '类目二', '类目三', '类目四', '类目五', '类目六', '类目七', '类目八', '类目九', '类目十'],
  tagA: '类目一',
  tagsB: ['不到一年', '一年以上三年以下', '三年以上五年以下', '五年以上'],
  tagB: '一年以上三年以下',
  cards: new Array(7).fill({
    title: '图片型卡片标题',
    content: '图片型卡片描述图片型卡片描述图片型卡片描述图片型卡片描述图片型卡片描述',
    link: ['链接一', '链接二']
  })
};

axios.defaults.baseURL ='https://www.pixiv.net';
const endpoint = "?format=json&mode=daily_r18"

const CardList = props => {
  const {
    dataSource = DEFAULT_DATA,
    onSearch = () => { }
  } = props;
  const [tagAValue, setTagAValue] = useState(dataSource.tagA);
  const [tagBValue, setTagBValue] = useState(dataSource.tagB);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const onTagAValueChange = v => {
    setLoading(true);
    setTagAValue(v);
  };

  const onTagBValueChange = v => {
    setLoading(true);
    setTagBValue(v);
  };

  const onSearchClick = () => {
    setLoading(true);
    onSearch();
  };

  const renderTagListA = () => {
    return dataSource.tagsA.map(name => <SelectableTag key={name} checked={tagAValue === name} onChange={() => onTagAValueChange(name)} {...props}>{name}
    </SelectableTag>);
  };

  const renderTagListB = () => {
    return dataSource.tagsB.map(name => <SelectableTag key={name} checked={tagBValue === name} onChange={() => onTagBValueChange(name)} {...props}>{name}
    </SelectableTag>);
  };

  const renderCards = () => {
    axios.defaults.withCredentials = true
    axios.defaults.crossDomain = true
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.get('/ranking.php', qs.stringify({
      format: "json"
    }))
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    return dataSource.cards.filter((d) => { return d.link[0] == '链接一' }).map((c, i) => <Cell colSpan={3} className={styles.ListItem} key={i}>
      <div className={styles.main}>
        <img src="https://images.unsplash.com/photo-1610579603987-bf0f588441aa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" alt="img" />
        <div className={styles.content}>
          <div className={styles.title}>
            {c.title}
          </div>
          <div className={styles.info}>
            {c.content}
          </div>
          <div className={styles.link}>
            <a href="#">{c.link[0]}</a>
            <a href="#">{c.link[1]}</a>
          </div>
        </div>
      </div>
    </Cell>);
  };

  return <>
    <Card free className={styles.CardList}>
      <Box align="center">
        <Search type="primary" hasIcon={false} searchText="搜索" onSearch={onSearchClick} />
      </Box>
      <Divider dashed style={{
        margin: '24px 0'
      }} />
      <Box className={styles.TagBox}>
        <div className={styles.TagBoxItem}>
          <Typography.Text className={styles.TagTitleName}>内容分类</Typography.Text>
          <TagGroup>{renderTagListA()}</TagGroup>
        </div>
        <div className={styles.TagBoxItem}>
          <Typography.Text className={styles.TagTitleName}>时间</Typography.Text>
          <TagGroup>{renderTagListB()}</TagGroup>
        </div>
      </Box>
    </Card>
    <Loading visible={loading} style={{
      display: 'block'
    }}>
      <ResponsiveGrid gap={20}>
        {/* <Cell colSpan={3} className={styles.ListItem}>
            <Box className={styles.add} justify="center" align="center">
              <Icon type="add" className={styles.icon} />
              <div className={styles.addText}>添加内容</div>
            </Box>
          </Cell> */}
        {renderCards()}
      </ResponsiveGrid>
    </Loading>
  </>;
};

export default CardList;