import React, { useEffect, useState } from 'react'
import css from './articles.module.css'
import api from '../../api/Api'
import { AxiosResponse } from "axios";
import Select from "react-select";
import { Link, useParams, useHistory, Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getLng, isAuth } from "../../state/selectors";
import { GlobalStateType } from "../../state/root-reducer";
import Pagination from "../pagination/Pagination";
import { ArticleSearch } from "../Styles";
import Footer from "../footer/Footer";
import Preloader from "../preloader/Preloader";
import like from "../../img/like.png";
import { selectStyle } from "../../utils/SelectStyle";
import Interweave from "interweave";
import NoElement, { NoOption } from "../../utils/NoElement";
import { checkToken } from "../../state/authReducer";
import { useTranslation } from "react-i18next";


type Props = {}
const Articles: React.FC<Props> = (props) => {
    const { t } = useTranslation();
    const params: any = useParams()
    const history = useHistory()
    const { path, url } = useRouteMatch();
    const lng = useSelector((state: GlobalStateType) => getLng(state))

    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    const categoriesList = categories.map((item: any) => {
        return {
            value: item.id,
            label: item.title
        }
    })
    const [pending, setPending] = useState(true)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState(0)
    const [goBack, setGoBack] = useState(false)

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState<any>(null)
    const [subCategoriesList, setSubCategoriesList] = useState<any>([])
    const [subCategories, setSubCategories] = useState<any>(null)
    const [subCategory, setSubCategory] = useState<any>(null)
    const [typesList, setTypesList] = useState<any>([])
    const [types, setTypes] = useState<any>([])
    const [type, setType] = useState<any>(null)
    const [subType, setSubType] = useState<any>(null)

    useEffect(() => {
        setPending(true)
        api.getArticles(
            search, page, +params.id === 0 ? null : params.id,
            subCategory ? subCategory.value : null,
            type ? type.value : null, subType ? subType.value : null
        )
            .then((res: AxiosResponse) => {
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
                setPending(false)
            })
    }, [page, params, search, subCategory, type, subType, lng])

    const getNew = () => {
        // history.push(url)
        api.getNewArticles(
            search, page, +params.id === 0 ? null : params.id,
            subCategory ? subCategory.value : null,
            type ? type.value : null
        )
            .then((res: AxiosResponse) => {
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
            })
    }
    const getPopular = () => {
        api.getPopularArticles(
            search, page, +params.id === 0 ? null : params.id,
            subCategory ? subCategory.value : null,
            type ? type.value : null
        )
            .then((res: AxiosResponse) => {
                setArticles(res.data.results)
                setPagination(Math.ceil(res.data.count / res.data.limit))
            })
    }
    useEffect(() => {
        if (subCategory !== null) {
            api.getTypes()
                .then((res) => {
                    let newArr = res.data.results.map((item: any) => ({
                        value: item.id,
                        label: item.title,
                        category: item.subcategory
                    }))
                    // setTypesList(newArr)
                    const arr = newArr.filter((item: any) => +subCategory.value === +item.category ? item : null)
                    setTypes(arr)
                })
        }
    }, [subCategory])

    useEffect(() => {
        if (type !== null) {
            api.getSubTypes()
                .then((res) => {
                    let newArr = res.data.results.map((item: any) => ({
                        value: item.id,
                        label: item.title,
                        category: item.subcategory
                    }))
                    // setTypesList(newArr)
                    const arr = newArr.filter((item: any) => +type.value === +item.category ? item : null)
                    setTypesList(arr)
                })
        }
    }, [type])

    useEffect(() => {
        const arr = subCategoriesList.filter((item: any) => +params.id === item.category ? item : null)
        setSubCategories(arr)
    }, [params])
    useEffect(() => {
        api.getSubCategory()
            .then((res: AxiosResponse) => {
                let newArr = res.data.results.map((item: any) => ({
                    value: item.id,
                    label: item.title,
                    category: item.category
                }))
                setSubCategoriesList(newArr)
                const arr = newArr.filter((item: any) => +params.id === item.category ? item : null)
                setSubCategories(arr)
            })
    }, [])

    const categoryChange = (e: any) => {
        setCategory(e)
        setSubCategory(null)
        setType(null)
        setSubType(null)
    }
    const subCategoryChange = (e: any) => {
        history.push(url)
        setSubCategory(e)
        setType(null)
        setSubType(null)
    }
    const typeChange = (e: any) => {
        history.push(url)
        setType(e)
        setSubType(null)
    }
    const subTypeChange = (e: any) => {
        history.push(url)
        setSubType(e)
    }
    const onSearch = (e: any) => {
        history.push(url)
        setSearch(e.target.value)
    }

    useEffect(() => {
        let data = categoriesList.filter((item: any) => item.value === +params.id ? item : null)
        setCategory(data)
    }, [])

    if (pending) {
        return <Preloader />
    }


    return (
        <div className={css.wrapper}>
            <Search value={search} setValue={onSearch} />
            <div className={css.articlesWrapper}>
                <ArticleNavBar
                    goBack={goBack}
                    setGoBack={() => setGoBack(false)}
                    getPopular={getPopular}
                    getNew={getNew}
                    typesOption={types}
                    types={type}
                    subTypes={subType}
                    subTypesOption={typesList}
                    setSubTypes={subTypeChange}
                    setTypes={typeChange}
                    subCategory={subCategory}
                    setSubCategory={subCategoryChange}
                    categoryVal={category}
                    setCategory={categoryChange}
                    category={categoriesList}
                    subCategories={subCategories}
                />
                <Switch>
                    <Route exact path={path}>
                        <div>
                            {
                                articles.length ? articles.map((item: any) => <Article

                                    key={item.id}
                                    id={item.id}
                                    description={item.text}
                                    title={item.title}
                                    date={item.pub_date}
                                    name={item.user.first_name + ' ' + item.user.last_name}
                                    category={item.category}
                                />)

                                    : <NoElement text={t("no-article")} />
                            }
                            {
                                articles.length
                                    ? < Pagination setPage={setPage} pageCount={pagination} />
                                    : null
                            }
                        </div>
                    </Route>
                    <Route path={`${path}/:article`}>
                        <DetailArticle
                            setGoBack={() => setGoBack(true)}
                        />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

type ArticleProps = {
    id: number
    category: string
    name: string
    date: string
    title: string
    description: string
    newUrl?: string
}
export const Article: React.FC<ArticleProps> = (props) => {
    let text: any = React.createRef()
    let a: any = props?.description
    let htmlObject: any = document.createElement('div');
    htmlObject.innerHTML = a
    let i = 0
    for (let item of htmlObject.children) {
        if (item.tagName === "IMG") {
            htmlObject.children[i].remove()
        }
        i++
    }
    useEffect(() => {
        let i = 0
        for (let item of text.current.children) {
            if (!item.children.length) {
                text.current.children[i].remove()
            }
            i++
        }
    }, [text])
    useEffect(() => {
        text.current.append(htmlObject)
        return () => {
            htmlObject.innerHTML = null
            a = null
        }
    }, [a])
    const { url } = useRouteMatch();
    const { t } = useTranslation();

    const params: any = useParams()

    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    let category: any = categories.map((item: any) => props.category === item.id ? item.title : null)
    return (
        <Link to={`${props.newUrl ? props.newUrl : url}/${params.id ? '' : "0/"}${props.id}`}>
            <div className={css.article}>
                <div className={css.header}>
                    <div className={css.category}>{category}</div>
                    <div className={css.name}>{props.name}</div>
                    <div className={css.date}>{props.date}</div>
                </div>
                <div className={css.title}>
                    {props.title}
                </div>
                <div className={css.text} id={'text'} ref={text}>
                    {/*<Interweave content={props?.description} />*/}
                </div>
            </div>
        </Link>
    )
}

type DetailArticleProps = {
    setGoBack?: any
}
export const DetailArticle = (props: DetailArticleProps) => {
    const params: any = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const auth = useSelector((state: GlobalStateType) => isAuth(state))
    const { t } = useTranslation();
    const lng = useSelector((state: GlobalStateType) => getLng(state))
    const categories = useSelector((state: GlobalStateType) => getCategories(state))
    const [article, setArticle] = useState<any>({})
    const [pending, setPending] = useState(true)
    const [vote, setVote] = useState(0)
    const [voted, setVoted] = useState(false)
    let category: any = categories.map((item: any) => article.category === item.id ? item.title : null)
    const getVote = async () => {
        return dispatch(checkToken(() => api.getVotesUser(params.article)))
    }
    useEffect(() => {
        if (auth) {
            getVote()
                .then((res: any) => {
                    if (res.data[0]) {
                        setVoted(res.data[0].vote)
                    }
                })
        }
        props?.setGoBack()
    }, [])
    const checkLike = async (data: any) => {
        return dispatch(checkToken(() => api.putLike(article.id, data)))
    }
    const putLike = () => {
        if (auth) {
            if (voted) {
                checkLike({
                    user: {
                        first_name: article.user.first_name,
                        last_name: article.user.last_name
                    },
                    vote: false
                }).then((res) => {
                    setVote(vote - 1)
                    setVoted(false)
                })
            } else {
                checkLike({
                    user: {
                        first_name: article.user.first_name,
                        last_name: article.user.last_name
                    },
                    vote: true
                }).then((res) => {
                    setVote(vote + 1)
                    setVoted(true)
                })
            }
        } else {
            history.push('/sign-in?back=true')
        }
    }

    useEffect(() => {
        api.getArticle(params.article)
            .then((res: AxiosResponse) => {
                setArticle(res.data)
                setVote(res.data.votes)
                setPending(false)
            })
    }, [params.article])

    useEffect(() => {
        let text: any = document.getElementById('text')
        let htmlObject: any = document.createElement('div');
        htmlObject.innerHTML = article.text;
        text?.append(htmlObject)
        return () => {
            let j = 0
            if (text?.children) {
                for (let i of text?.children) {
                    text?.children[j].remove()
                    j++
                }
            }
        }
    })
    if (pending) {
        return <div><Preloader /></div>
    }
    return (
        <div className={css.article}>
            <div className={css.header}>
                <div className={css.category}>{category}</div>
                <div className={css.name}>{article.user.first_name + ' ' + article.user.last_name}</div>
                <div className={css.date}>{article.pub_date}</div>
            </div>
            <div className={css.title}>
                {article.title}
            </div>
            <div className={css.ArticleText} id={'text'}>
                {/*<Interweave content={article.text} />*/}
                {
                    article.additions.map((item: any) => {
                        return <div key={item.id}>
                            <div className={css.title}>{item.subtitle}</div>
                            <Interweave content={item.subtext} />
                        </div>
                    })
                }
            </div>
            <div className={css.likes}>
                <div onClick={putLike} className={voted ? css.imgWrapper + ' ' + css.blueBorder1 : css.imgWrapper}>
                    <img src={like} alt="Like" />{t("like")}
                </div>
                <div className={voted ? css.count + ' ' + css.blueBorder2 : css.count}>
                    {vote}
                </div>
            </div>
        </div>
    )
}

type ArticleNavBarProps = {
    category: any
    categoryVal: any
    setCategory: any
    subCategory: any
    setSubCategory: (e: any) => void
    subCategories: [{}]
    types: any
    setTypes: (e: any) => void
    typesOption: [{}]
    subTypes: any
    setSubTypes: (e: any) => void
    subTypesOption: [{}]
    getNew: () => void
    getPopular: () => void
    goBack: boolean
    setGoBack: any
}

export const ArticleNavBar: React.FC<ArticleNavBarProps> = (props) => {
    const history = useHistory()
    const { t } = useTranslation();

    return (
        <div className={css.navBar}>
            <div className={css.newPopular}>
                {
                    props.goBack
                        ? <div className={css.noMobile} onClick={() => {
                            history.goBack()
                            props.setGoBack()
                        }}>{t('back')}</div>
                        : <>
                            <div onClick={props.getNew}>{t("new")}</div>
                            <div onClick={props.getPopular}>{t("popular")}</div>
                        </>
                }
            </div>
            <div className={css.filterWrapper}>
                <div className={css.width100}>
                    <div className={css.filterCategory}>{t("category")}</div>
                    <Select value={props.categoryVal} onChange={(e: any) => {
                        history.push(`/articles/${e.value}`)
                        props.setCategory(e)
                    }}
                        noOptionsMessage={() => NoOption('Нет категорий')}
                        styles={selectStyle}
                        placeholder={t('selectCategoryText')}
                        options={props.category} />
                </div>
                <div className={css.width100}>
                    <div className={css.filterCategory}>{t('subCategory')}</div>
                    <Select
                        noOptionsMessage={() => NoOption(t('noSubCategoryText'))}
                        styles={selectStyle}
                        placeholder={t('selectCategoryText')}
                        options={props.subCategories}
                        value={props.subCategory}
                        onChange={props.setSubCategory}
                    />
                </div>
                <div className={css.width100}>
                    <div className={css.filterCategory}>{t('type')}</div>
                    <Select
                        noOptionsMessage={() => NoOption(t('noType'))}
                        styles={selectStyle}
                        placeholder={t("selectType")}
                        options={props.typesOption}
                        value={props.types}
                        onChange={props.setTypes}
                    />
                </div>
                <div className={css.NoSelectSubType}>
                    <div className={css.filterCategory}>{t("selectSubType")}</div>
                    <Select
                        noOptionsMessage={() => NoOption(t("NoSelectSubType"))}
                        styles={selectStyle}
                        placeholder={t("selectSubTypeText")}
                        options={props.subTypesOption}
                        value={props.subTypes}
                        onChange={props.setSubTypes}
                    />
                </div>
            </div>
        </div>
    )
}

export default Articles

type SearchProps = {
    value: string
    setValue: any
}
export const Search: React.FC<SearchProps> = (props) => {
    const { t } = useTranslation();

    return (
        <div className={css.search}>
            <label>
                <ArticleSearch />
                <input type="text" placeholder={t("search")}
                    value={props.value} onChange={props.setValue}
                    className={css.submit2} />
                <input type="submit" placeholder={''} value={''} className={css.submit} />
            </label>
        </div>
    )
}