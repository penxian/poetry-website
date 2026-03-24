import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import './App.css'

function App() {
  const [allData, setAllData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  
  // 筛选条件
  const [filters, setFilters] = useState({
    dynasty: '',
    author: '',
    style: '',
    priority: ''
  })
  
  const [selectedPoem, setSelectedPoem] = useState(null)

  // 加载数据
  useEffect(() => {
    loadPoetryData()
  }, [])

  async function loadPoetryData() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('poetry')
        .select('*')
      
      if (error) {
        console.error('Supabase 加载失败，回退到本地数据', error)
        // 降级到本地数据
        const localData = [...poetryData]
        processData(localData)
      } else {
        console.log(`从 Supabase 加载了 ${data.length} 首古诗词`)
        processData(data)
      }
    } catch (e) {
      console.error('Supabase 连接失败，回退到本地数据', e)
      const localData = [...poetryData]
      processData(localData)
    } finally {
      setLoading(false)
    }
  }

  function processData(data) {
    const authorSet = new Set()
    data.forEach(p => authorSet.add(p.author))
    
    const sortedAuthors = Array.from(authorSet).sort()
    setAuthors(sortedAuthors)
    setAllData(data)
    
    // 初始筛选排序
    const sorted = [...data].sort((a, b) => {
      if (a.compulsory !== b.compulsory) {
        return a.compulsory ? -1 : 1
      }
      return b.spread - a.spread
    })
    
    setFilteredData(sorted)
  }

  // 筛选
  useEffect(() => {
    let result = [...allData]
    
    if (filters.dynasty) {
      result = result.filter(p => p.dynasty === filters.dynasty)
    }
    if (filters.author) {
      result = result.filter(p => p.author === filters.author)
    }
    if (filters.style) {
      result = result.filter(p => p.style === filters.style)
    }
    if (filters.priority === 'compulsory') {
      result = result.filter(p => p.compulsory)
    }
    
    // 排序
    result.sort((a, b) => {
      if (a.compulsory !== b.compulsory) {
        return a.compulsory ? -1 : 1
      }
      return b.spread - a.spread
    })
    
    setFilteredData(result)
  }, [filters, allData])

  function handleFilterChange(name, value) {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function openModal(poem) {
    setSelectedPoem(poem)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setSelectedPoem(null)
    document.body.style.overflow = ''
  }

  return (
    <div className="app">
      <header>
        <h1>古诗词选集</h1>
        <p className="subtitle">九年义务教育必背古诗词 · React + Supabase</p>
      </header>

      <div className="container">
        {/* 筛选区 */}
        <section className="filters">
          <div className="filter-group">
            <label>朝代</label>
            <select 
              value={filters.dynasty} 
              onChange={e => handleFilterChange('dynasty', e.target.value)}
            >
              <option value="">全部</option>
              <option value="先秦">先秦</option>
              <option value="汉魏">汉魏</option>
              <option value="唐代">唐代</option>
              <option value="宋代">宋代</option>
              <option value="元明清">元明清</option>
            </select>
          </div>
          <div className="filter-group">
            <label>作者</label>
            <select 
              value={filters.author}
              onChange={e => handleFilterChange('author', e.target.value)}
            >
              <option value="">全部</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>风格</label>
            <select 
              value={filters.style}
              onChange={e => handleFilterChange('style', e.target.value)}
            >
              <option value="">全部</option>
              <option value="山水田园">山水田园</option>
              <option value="边塞征战">边塞征战</option>
              <option value="思乡怀人">思乡怀人</option>
              <option value="咏史怀古">咏史怀古</option>
              <option value="抒情言志">抒情言志</option>
              <option value="爱情">爱情</option>
            </select>
          </div>
          <div className="filter-group">
            <label>优先级</label>
            <select 
              value={filters.priority}
              onChange={e => handleFilterChange('priority', e.target.value)}
            >
              <option value="">全部</option>
              <option value="compulsory">九年义务教育必背</option>
            </select>
          </div>
        </section>

        {/* 统计 */}
        <div className="stats">
          {loading ? '加载中...' : `共 ${filteredData.length} 首古诗词`}
        </div>

        {/* 诗词列表 */}
        {!loading && (
          <div className="poetry-list">
            {filteredData.length === 0 ? (
              <p className="empty">没有找到匹配的古诗词</p>
            ) : (
              filteredData.map(poem => (
                <div 
                  key={poem.id || poem.title} 
                  className={`poetry-card ${poem.compulsory ? 'compulsory' : ''}`}
                  onClick={() => openModal(poem)}
                >
                  <h3>
                    {poem.title}
                    {poem.compulsory && <span className="badge">必背</span>}
                  </h3>
                  <p className="author">{poem.author} · {poem.dynasty}</p>
                  <div className="meta">
                    <span className="meta-tag">{poem.style}</span>
                    <span className={`meta-tag ${poem.popularity >= 90 ? 'high-popularity' : ''}`}>
                      传唱 {poem.spread}
                    </span>
                  </div>
                  <p className="preview">
                    {poem.content.split('\n').slice(0, 2).join('\n')}...
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 弹窗 */}
      {selectedPoem && (
        <div className="modal show" onClick={e => {
          if (e.target === e.currentTarget) closeModal()
        }}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-body">
              <h2>
                {selectedPoem.title}
                {selectedPoem.compulsory && <span className="badge">九年义务教育必背</span>}
              </h2>
              <div className="author-meta">
                {selectedPoem.author} · {selectedPoem.dynasty} · {selectedPoem.style}
              </div>
              <div className="content">
                {selectedPoem.content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div className="info">
                <div className="info-row">
                  <span className="info-label">流行度</span>
                  <span>{selectedPoem.popularity}/100</span>
                </div>
                <div className="info-row">
                  <span className="info-label">传唱度</span>
                  <span>{selectedPoem.spread}/100</span>
                </div>
                <div className="info-row">
                  <span className="info-label">优先级</span>
                  <span>{selectedPoem.compulsory ? '九年义务教育必背（高优先级）' : '推荐阅读'}</span>
                </div>
                {selectedPoem.notes && (
                  <div className="info-row notes">
                    <span className="info-label">说明</span>
                    <span>{selectedPoem.notes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <p>React + Supabase · 免费开源 · 纯前端</p>
      </footer>
    </div>
  )
}

export default App
