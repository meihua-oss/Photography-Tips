const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ============ 工具函数 ============
const FAV_KEY = 'photo_pose_favorites';
const CUSTOM_CATS_KEY = 'photo_guide_custom_categories';
const CUSTOM_IMGS_KEY = 'photo_guide_custom_images';

// ---- 收藏 ----
const getFavorites = () => {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};
const saveFavorites = (favs) => {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
};
const isFavorite = (poseId, favs) => favs.includes(poseId);
const toggleFavorite = (poseId, favs) => {
  const newFavs = favs.includes(poseId)
    ? favs.filter(id => id !== poseId)
    : [...favs, poseId];
  saveFavorites(newFavs);
  return newFavs;
};

// ---- 自定义分类 ----
const getCustomCategories = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_CATS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};
const saveCustomCategories = (cats) => {
  try { localStorage.setItem(CUSTOM_CATS_KEY, JSON.stringify(cats)); } catch (e) {}
};

// ---- 自定义图片 ----
const getCustomImages = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_IMGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
};
const saveCustomImages = (imgs) => {
  try { localStorage.setItem(CUSTOM_IMGS_KEY, JSON.stringify(imgs)); } catch (e) {}
};

// ---- 合并数据 ----
const getAllCategories = (customCats, customImgs) => {
  const result = [];
  // 原有分类
  POSE_DATA.forEach(cat => {
    const catCustomImgs = customImgs.filter(img => img.categoryId === cat.id);
    result.push({
      ...cat,
      isCustom: false,
      images: [...cat.images, ...catCustomImgs.map(i => i.data)],
      customImageIds: catCustomImgs.map(i => i.id),
      totalImageCount: cat.images.length + catCustomImgs.length,
      baseImageCount: cat.images.length,
    });
  });
  // 自定义分类
  customCats.forEach(cat => {
    const catCustomImgs = customImgs.filter(img => img.categoryId === cat.id);
    result.push({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      tags: cat.tags,
      color: cat.color,
      actionPoints: cat.actionPoints || '',
      outfitTips: cat.outfitTips || '',
      photoTips: cat.photoTips || '',
      isCustom: true,
      images: catCustomImgs.map(i => i.data),
      customImageIds: catCustomImgs.map(i => i.id),
      totalImageCount: catCustomImgs.length,
      baseImageCount: 0,
    });
  });
  return result;
};

const buildAllPoseItems = (allCategories) => {
  const items = [];
  allCategories.forEach(cat => {
    cat.images.forEach((img, idx) => {
      items.push({
        id: `${cat.id}-${idx}`,
        categoryId: cat.id,
        categoryName: cat.name,
        categoryIcon: cat.icon,
        categoryColor: cat.color,
        image: img,
        imageIndex: idx,
        imageCount: cat.images.length,
        actionPoints: cat.actionPoints,
        outfitTips: cat.outfitTips,
        photoTips: cat.photoTips,
        tags: cat.tags,
        isCustomImg: idx >= cat.baseImageCount,
        isCustomCategory: !!cat.isCustom,
      });
    });
  });
  return items;
};

const genId = () => `custom_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const PRESET_COLORS = [
  "#D4A574", "#E8B4B8", "#F5B8C8", "#F2C14E", "#C97B4A",
  "#A8C8E4", "#E8B8D4", "#B8A8D4", "#D9534F", "#8B5A7C",
  "#5C6B7C", "#A84444", "#7A8B6B", "#6B4E7B", "#5B9BD5",
  "#D4956A", "#4A5568", "#C9A86C", "#D47FA6", "#F2A93B",
];

// ============ 组件 ============

const SearchIcon = () => (
  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const ImageViewer = ({ images, initialIndex, categoryName, onClose, onDelete, canDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const trackRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (trackRef.current && initialIndex >= 0) {
      const el = trackRef.current;
      setTimeout(() => { el.scrollLeft = initialIndex * el.offsetWidth; }, 10);
    }
  }, [initialIndex, images.length]);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    if (idx !== currentIndex && idx >= 0 && idx < images.length) {
      setCurrentIndex(idx);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete && canDelete) onDelete(currentIndex);
  };

  return (
    <div className={`image-viewer-overlay ${initialIndex >= 0 ? 'active' : ''}`} onClick={onClose}>
      <div className="viewer-header" onClick={e => e.stopPropagation()}>
        <span className="viewer-counter">{currentIndex + 1} / {images.length}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {canDelete && (
            <button className="viewer-close" onClick={handleDelete} title="删除">🗑️</button>
          )}
          <button className="viewer-close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div
        className="viewer-track"
        ref={trackRef}
        onScroll={handleScroll}
        onClick={e => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <div className="viewer-slide" key={i}>
            <img src={src} alt={`${categoryName} ${i + 1}`} draggable={false} />
          </div>
        ))}
      </div>
      <div className="viewer-footer">{categoryName}</div>
    </div>
  );
};

const NewCategoryModal = ({ visible, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📷');
  const [tagsInput, setTagsInput] = useState('');
  const [actionPoints, setActionPoints] = useState('');
  const [outfitTips, setOutfitTips] = useState('');
  const [photoTips, setPhotoTips] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);

  const emojiOptions = ['📷', '🌸', '🌻', '🍂', '❄️', '🏖️', '🏔️', '🎀', '🔥', '💋', '👑', '🏮', '🤳', '🍜', '🕶️', '💎', '🌷', '🤪', '👯', '✈️', '🍸', '🏯'];

  useEffect(() => {
    if (visible) {
      setName('');
      setIcon('📷');
      setTagsInput('');
      setActionPoints('');
      setOutfitTips('');
      setPhotoTips('');
      setColor(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);
    }
  }, [visible]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    const tags = tagsInput
      .split(/[,，]/)
      .map(t => t.trim())
      .filter(Boolean);
    onCreate({
      id: genId(),
      name: name.trim(),
      icon,
      tags,
      color,
      actionPoints: actionPoints.trim(),
      outfitTips: outfitTips.trim(),
      photoTips: photoTips.trim(),
    });
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-title">新建分类</div>

        <div className="form-group">
          <label className="form-label">分类名称 <span className="form-required">*</span></label>
          <input
            className="form-input"
            type="text"
            placeholder="如：海边拍照"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={20}
          />
        </div>

        <div className="form-group">
          <label className="form-label">分类图标</label>
          <div className="emoji-picker">
            {emojiOptions.map(em => (
              <button
                key={em}
                className={`emoji-option ${icon === em ? 'active' : ''}`}
                onClick={() => setIcon(em)}
              >{em}</button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">标签（逗号分隔）</label>
          <input
            className="form-input"
            type="text"
            placeholder="如：海边,夏日,度假"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">主题色</label>
          <div className="color-picker">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                className={`color-option ${color === c ? 'active' : ''}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">动作要点</label>
          <textarea
            className="form-textarea"
            placeholder="这个分类的拍照动作要点..."
            value={actionPoints}
            onChange={e => setActionPoints(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label className="form-label">穿搭建议</label>
          <textarea
            className="form-textarea"
            placeholder="穿什么衣服更出片..."
            value={outfitTips}
            onChange={e => setOutfitTips(e.target.value)}
            rows={2}
          />
        </div>

        <div className="form-group">
          <label className="form-label">拍照提醒</label>
          <textarea
            className="form-textarea"
            placeholder="拍照时的小技巧..."
            value={photoTips}
            onChange={e => setPhotoTips(e.target.value)}
            rows={2}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>取消</button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!name.trim()}
          >确认创建</button>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal = ({ visible, title, message, confirmText, cancelText, onConfirm, onCancel, danger }) => {
  if (!visible) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{title}</div>
        <div className="confirm-message">{message}</div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>{cancelText || '取消'}</button>
          <button
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >{confirmText || '确认'}</button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, visible }) => (
  <div className={`toast ${visible ? 'show' : ''}`}>{message}</div>
);

// ============ 页面 ============

const HomePage = ({ allCategories, onOpenCategory, onGoRandom, onNewCategory }) => {
  const [keyword, setKeyword] = useState('');

  const filteredCategories = useMemo(() => {
    if (!keyword.trim()) return allCategories;
    const kw = keyword.trim().toLowerCase();
    return allCategories.filter(cat =>
      cat.name.toLowerCase().includes(kw) ||
      cat.tags.some(t => t.toLowerCase().includes(kw))
    );
  }, [keyword, allCategories]);

  const isSearching = keyword.trim().length > 0;

  const highlightText = (text, kw) => {
    if (!kw) return text;
    const idx = text.toLowerCase().indexOf(kw.toLowerCase());
    if (idx < 0) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="search-highlight">{text.slice(idx, idx + kw.length)}</span>
        {text.slice(idx + kw.length)}
      </>
    );
  };

  return (
    <>
      <div className="top-bar" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="search-box">
          <SearchIcon />
          <input
            className="search-input"
            type="text"
            placeholder="搜索拍照姿势、风格、场景..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          {keyword && (
            <button className="search-clear" onClick={() => setKeyword('')}>✕</button>
          )}
        </div>
      </div>

      <div className="page-scroll">
        {!isSearching && (
          <>
            <div className="hero-section">
              <div className="hero-title">拍照秘籍</div>
              <div className="hero-subtitle">出门拍照不迷茫，{allCategories.length}种姿势随你挑</div>
            </div>

            <div className="random-btn-wrapper">
              <button className="random-btn" onClick={onGoRandom}>
                🎲 随机推荐一个姿势
              </button>
            </div>

            <div className="category-section">
              <div className="section-header">
                <div className="section-title">全部姿势</div>
                <div className="section-count">共 {allCategories.length} 个分类</div>
              </div>
              <div className="category-grid">
                {allCategories.map(cat => (
                  <div
                    key={cat.id}
                    className="category-card"
                    onClick={() => onOpenCategory(cat)}
                  >
                    <div className="category-icon" style={{ background: `${cat.color}20` }}>
                      {cat.icon}
                    </div>
                    <div className="category-name">{cat.name}</div>
                    <div className="category-count">{cat.totalImageCount} 张示例</div>
                    {cat.isCustom && <div className="custom-badge">自定义</div>}
                  </div>
                ))}
                <div className="category-card add-category-card" onClick={onNewCategory}>
                  <div className="category-icon add-category-icon">＋</div>
                  <div className="category-name">新建分类</div>
                  <div className="category-count">创建你的专属</div>
                </div>
              </div>
            </div>

            <div className="tips-section">
              <div className="section-header">
                <div className="section-title">拍照万能口诀</div>
              </div>
              <div className="tips-card">
                <div className="tips-title">记住这5条，拍照不踩坑</div>
                <ul className="tips-list">
                  {UNIVERSAL_TIPS.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {isSearching && (
          <div className="search-results">
            <div className="section-header">
              <div className="section-title" style={{ fontSize: 15 }}>
                搜索结果 ({filteredCategories.length})
              </div>
            </div>
            {filteredCategories.length === 0 ? (
              <div className="fav-empty" style={{ padding: '60px 20px' }}>
                <div className="fav-empty-icon">🔍</div>
                <div className="fav-empty-title">没有找到相关内容</div>
                <div className="fav-empty-desc">试试换个关键词，比如"汉服"、"夏天"、"情侣"</div>
              </div>
            ) : (
              filteredCategories.map(cat => (
                <div
                  key={cat.id}
                  className="search-result-item"
                  onClick={() => onOpenCategory(cat)}
                >
                  <div className="search-result-icon" style={{ background: `${cat.color}20` }}>
                    {cat.icon}
                  </div>
                  <div className="search-result-info">
                    <div className="search-result-name">
                      {highlightText(cat.name, keyword.trim())}
                      {cat.isCustom && <span className="custom-tag">自定义</span>}
                    </div>
                    <div className="search-result-tags">
                      {cat.tags.map((t, i) => (
                        <span key={t}>#{t}{i < cat.tags.length - 1 ? ' · ' : ''}</span>
                      ))}
                    </div>
                  </div>
                  <div className="search-result-count">{cat.totalImageCount} 张</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

const CategoryPage = ({ category, favs, onToggleFav, onBack, onImageClick, onAddPhoto, onDeleteCategory, onDeleteImage }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);
  const baseCount = category.baseImageCount !== undefined ? category.baseImageCount : (POSE_DATA.find(c => c.id === category.id)?.images.length || 0);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      onAddPhoto(category.id, base64);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <>
      <div className="top-bar with-back">
        <button className="back-btn" onClick={onBack}>‹</button>
        <div className="top-title">{category.name}</div>
        {category.isCustom && (
          <button className="delete-cat-btn" onClick={() => setShowDeleteConfirm(true)} title="删除分类">🗑️</button>
        )}
        {!category.isCustom && <div style={{ width: 32 }} />}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div className="page-scroll">
        <div className="category-header">
          <div className="category-header-title">
            {category.icon} {category.name}
          </div>
          <div className="category-header-desc">
            {category.actionPoints || '暂无动作要点，点击添加照片开始记录你的姿势秘籍～'}
          </div>
          <div className="pose-tag-row">
            {category.tags && category.tags.length > 0 ? (
              category.tags.map(tag => (
                <span key={tag} className="pose-tag">#{tag}</span>
              ))
            ) : (
              <span className="pose-tag">暂无标签</span>
            )}
          </div>
        </div>

        <div className="category-poses">
          {category.images.map((img, i) => {
            const isCustom = i >= baseCount;
            return (
              <div key={i} className="pose-item">
                <div
                  className="pose-item-image-wrapper"
                  onClick={() => onImageClick(category, i)}
                >
                  <span className="pose-item-badge">
                    {i + 1} / {category.images.length}
                    {isCustom && ' · 自定义'}
                  </span>
                  <img src={img} alt={`${category.name} ${i + 1}`} loading="lazy" />
                </div>
                <div className="pose-item-content">
                  <div className="pose-item-title">
                    <span>姿势 {i + 1}</span>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      {isCustom && (
                        <button
                          className="fav-btn small-fav-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteImage(category.id, i);
                          }}
                          title="删除"
                        >🗑️</button>
                      )}
                      <button
                        className="fav-btn"
                        onClick={() => onToggleFav(`${category.id}-${i}`)}
                      >
                        {isFavorite(`${category.id}-${i}`, favs) ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                  {i === 0 && (category.actionPoints || category.outfitTips || category.photoTips) && (
                    <>
                      {category.actionPoints && (
                        <div className="pose-tip-block" style={{ marginBottom: 10 }}>
                          <div className="pose-tip-icon" style={{ background: 'rgba(212, 165, 116, 0.15)' }}>💃</div>
                          <div className="pose-tip-content">
                            <div className="pose-tip-label">动作要点</div>
                            <div>{category.actionPoints}</div>
                          </div>
                        </div>
                      )}
                      {category.outfitTips && (
                        <div className="pose-tip-block" style={{ marginBottom: 10 }}>
                          <div className="pose-tip-icon" style={{ background: 'rgba(232, 180, 184, 0.2)' }}>👗</div>
                          <div className="pose-tip-content">
                            <div className="pose-tip-label">穿搭建议</div>
                            <div>{category.outfitTips}</div>
                          </div>
                        </div>
                      )}
                      {category.photoTips && (
                        <div className="pose-tip-block">
                          <div className="pose-tip-icon" style={{ background: 'rgba(168, 144, 112, 0.15)' }}>📸</div>
                          <div className="pose-tip-content">
                            <div className="pose-tip-label">拍照提醒</div>
                            <div>{category.photoTips}</div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          <div className="add-photo-card" onClick={handleAddClick}>
            <div className="add-photo-icon">＋</div>
            <div className="add-photo-text">添加照片</div>
            <div className="add-photo-hint">上传你的拍照姿势参考</div>
          </div>
        </div>
      </div>

      <ConfirmModal
        visible={showDeleteConfirm}
        title="删除分类"
        message={`确定要删除"${category.name}"吗？该分类下的所有自定义照片也会被删除，此操作不可恢复。`}
        confirmText="删除"
        cancelText="取消"
        danger={true}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDeleteCategory(category.id);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};

const RandomPage = ({ favs, onToggleFav, onImageClick, allPoseItems }) => {
  const [currentPose, setCurrentPose] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const pickRandom = useCallback(() => {
    if (allPoseItems.length === 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * allPoseItems.length);
      setCurrentPose(allPoseItems[idx]);
      setIsFlipping(false);
    }, 300);
  }, [allPoseItems]);

  useEffect(() => {
    pickRandom();
  }, [allPoseItems]);

  if (!currentPose) return null;

  const isFav = isFavorite(currentPose.id, favs);
  const category = {
    id: currentPose.categoryId,
    name: currentPose.categoryName,
    icon: currentPose.categoryIcon,
    color: currentPose.categoryColor,
    images: allPoseItems.filter(p => p.categoryId === currentPose.categoryId).map(p => p.image),
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-title" style={{ margin: 0 }}>🎲 随机推荐</div>
      </div>

      <div className="page-scroll">
        <div className="random-page">
          <div className={`random-card ${isFlipping ? 'flipping' : ''}`}>
            <div
              className="random-card-image"
              onClick={() => onImageClick(category, currentPose.imageIndex)}
            >
              <span className="random-card-cat">
                {currentPose.categoryIcon} {currentPose.categoryName}
              </span>
              <button
                className="random-card-fav"
                onClick={() => onToggleFav(currentPose.id)}
              >
                {isFav ? '❤️' : '🤍'}
              </button>
              <img src={currentPose.image} alt={currentPose.categoryName} />
            </div>
            <div className="random-card-body">
              <div className="random-card-title">
                {currentPose.categoryName} · 姿势 {currentPose.imageIndex + 1}
              </div>
              {currentPose.actionPoints && (
                <div className="random-tip">
                  <div className="random-tip-label">💃 动作要点</div>
                  <div className="random-tip-text">{currentPose.actionPoints}</div>
                </div>
              )}
              {currentPose.outfitTips && (
                <div className="random-tip">
                  <div className="random-tip-label">👗 穿搭建议</div>
                  <div className="random-tip-text">{currentPose.outfitTips}</div>
                </div>
              )}
              {currentPose.photoTips && (
                <div className="random-tip">
                  <div className="random-tip-label">📸 拍照提醒</div>
                  <div className="random-tip-text">{currentPose.photoTips}</div>
                </div>
              )}
              {currentPose.tags && currentPose.tags.length > 0 && (
                <div className="pose-tag-row" style={{ marginTop: 14 }}>
                  {currentPose.tags.map(tag => (
                    <span key={tag} className="pose-tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="random-reload-btn" onClick={pickRandom}>
            🔄 换一个姿势
          </button>
        </div>
      </div>
    </>
  );
};

const FavoritesPage = ({ favs, onToggleFav, onImageClick, allPoseItems }) => {
  const favoritePoses = useMemo(() => {
    return allPoseItems.filter(p => favs.includes(p.id));
  }, [favs, allPoseItems]);

  return (
    <>
      <div className="top-bar">
        <div className="top-title" style={{ margin: 0 }}>我的收藏</div>
      </div>

      <div className="page-scroll">
        {favoritePoses.length === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty-icon">💌</div>
            <div className="fav-empty-title">还没有收藏的姿势</div>
            <div className="fav-empty-desc">
              看到喜欢的姿势，点击 🤍 就能收藏<br />
              随时在这里找到它们
            </div>
          </div>
        ) : (
          <div className="fav-list">
            <div className="section-header" style={{ marginBottom: 12 }}>
              <div className="section-title" style={{ fontSize: 15 }}>
                已收藏 {favoritePoses.length} 个姿势
              </div>
            </div>
            {favoritePoses.map(pose => (
              <div key={pose.id} className="pose-item">
                <div className="pose-item-image-wrapper" onClick={() => {
                  const cat = {
                    id: pose.categoryId,
                    name: pose.categoryName,
                    images: allPoseItems.filter(p => p.categoryId === pose.categoryId).map(p => p.image),
                  };
                  onImageClick(cat, pose.imageIndex);
                }}>
                  <span className="pose-item-badge">
                    {pose.categoryIcon} {pose.categoryName} · {pose.imageIndex + 1}/{pose.imageCount}
                  </span>
                  <img src={pose.image} alt={pose.categoryName} loading="lazy" />
                </div>
                <div className="pose-item-content">
                  <div className="pose-item-title">
                    <span>{pose.categoryName}</span>
                    <button className="fav-btn" onClick={() => onToggleFav(pose.id)}>
                      ❤️
                    </button>
                  </div>
                  <div className="pose-item-desc">{pose.actionPoints || '自定义姿势'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// ============ 主应用 ============
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [favs, setFavs] = useState(() => getFavorites());
  const [customCats, setCustomCats] = useState(() => getCustomCategories());
  const [customImgs, setCustomImgs] = useState(() => getCustomImages());
  const [viewerState, setViewerState] = useState({ images: [], index: -1, name: '', canDelete: false, categoryId: null });
  const [toast, setToast] = useState({ message: '', visible: false });
  const [showNewCatModal, setShowNewCatModal] = useState(false);
  const [showDeleteImgConfirm, setShowDeleteImgConfirm] = useState({ visible: false, categoryId: null, imageIndex: -1 });
  const toastTimer = useRef(null);

  const allCategories = useMemo(() => getAllCategories(customCats, customImgs), [customCats, customImgs]);
  const allPoseItems = useMemo(() => buildAllPoseItems(allCategories), [allCategories]);

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, 1500);
  }, []);

  const handleToggleFav = useCallback((poseId) => {
    setFavs(prev => {
      const wasFav = prev.includes(poseId);
      const newFavs = toggleFavorite(poseId, prev);
      showToast(wasFav ? '已取消收藏' : '已收藏 ❤️');
      return newFavs;
    });
  }, [showToast]);

  const handleOpenCategory = (cat) => {
    setCurrentCategory(cat);
  };

  const handleCloseCategory = () => {
    setCurrentCategory(null);
  };

  const handleImageClick = (category, initialIndex) => {
    const baseCount = category.baseImageCount !== undefined
      ? category.baseImageCount
      : (POSE_DATA.find(c => c.id === category.id)?.images.length || 0);
    const canDelete = initialIndex >= baseCount;

    setViewerState({
      images: category.images,
      index: initialIndex,
      name: category.name,
      canDelete,
      categoryId: category.id,
    });
  };

  const handleCloseViewer = () => {
    setViewerState(s => ({ ...s, index: -1 }));
  };

  const handleAddPhoto = useCallback((categoryId, base64Data) => {
    const newImg = {
      id: genId(),
      categoryId,
      data: base64Data,
      createdAt: Date.now(),
    };
    setCustomImgs(prev => {
      const next = [...prev, newImg];
      saveCustomImages(next);
      return next;
    });
    showToast('照片添加成功 📷');
  }, [showToast]);

  const handleDeleteImage = useCallback((categoryId, imageIndex) => {
    setShowDeleteImgConfirm({ visible: true, categoryId, imageIndex });
  }, []);

  const confirmDeleteImage = useCallback(() => {
    const { categoryId, imageIndex } = showDeleteImgConfirm;
    const cat = allCategories.find(c => c.id === categoryId);
    if (!cat) return;
    const baseCount = cat.baseImageCount !== undefined ? cat.baseImageCount : 0;
    const customIdx = imageIndex - baseCount;
    if (customIdx < 0 || !cat.customImageIds || customIdx >= cat.customImageIds.length) return;

    const imgId = cat.customImageIds[customIdx];

    setCustomImgs(prev => {
      const next = prev.filter(img => img.id !== imgId);
      saveCustomImages(next);
      return next;
    });

    const poseId = `${categoryId}-${imageIndex}`;
    setFavs(prev => {
      if (!prev.includes(poseId)) return prev;
      const next = prev.filter(id => id !== poseId);
      saveFavorites(next);
      return next;
    });

    handleCloseViewer();
    setShowDeleteImgConfirm({ visible: false, categoryId: null, imageIndex: -1 });
    showToast('照片已删除');
  }, [showDeleteImgConfirm, allCategories, showToast]);

  const handleDeleteFromViewer = useCallback((currentIndex) => {
    if (!viewerState.categoryId) return;
    handleDeleteImage(viewerState.categoryId, currentIndex);
  }, [viewerState.categoryId, handleDeleteImage]);

  const handleCreateCategory = useCallback((catData) => {
    setCustomCats(prev => {
      const next = [...prev, catData];
      saveCustomCategories(next);
      return next;
    });
    setShowNewCatModal(false);
    showToast('分类创建成功 ✨');
  }, [showToast]);

  const handleDeleteCategory = useCallback((categoryId) => {
    setCustomCats(prev => {
      const next = prev.filter(c => c.id !== categoryId);
      saveCustomCategories(next);
      return next;
    });
    setCustomImgs(prev => {
      const next = prev.filter(img => img.categoryId !== categoryId);
      saveCustomImages(next);
      return next;
    });
    setFavs(prev => {
      const next = prev.filter(id => !String(id).startsWith(`${categoryId}-`));
      saveFavorites(next);
      return next;
    });
    setCurrentCategory(null);
    showToast('分类已删除');
  }, [showToast]);

  const handleGoRandom = () => {
    setActiveTab('random');
  };

  // 当自定义图片/分类变化时，同步更新 currentCategory 引用，保证详情页实时刷新
  useEffect(() => {
    if (!currentCategory) return;
    const updated = allCategories.find(c => c.id === currentCategory.id);
    if (updated && updated !== currentCategory) {
      setCurrentCategory(updated);
    }
  }, [allCategories, currentCategory]);

  return (
    <div className="app-container">
      {currentCategory ? (
        <CategoryPage
          category={currentCategory}
          favs={favs}
          onToggleFav={handleToggleFav}
          onBack={handleCloseCategory}
          onImageClick={handleImageClick}
          onAddPhoto={handleAddPhoto}
          onDeleteCategory={handleDeleteCategory}
          onDeleteImage={handleDeleteImage}
        />
      ) : (
        <>
          {activeTab === 'home' && (
            <HomePage
              allCategories={allCategories}
              favs={favs}
              onToggleFav={handleToggleFav}
              onOpenCategory={handleOpenCategory}
              onImageClick={handleImageClick}
              onGoRandom={handleGoRandom}
              onNewCategory={() => setShowNewCatModal(true)}
            />
          )}
          {activeTab === 'random' && (
            <RandomPage
              favs={favs}
              onToggleFav={handleToggleFav}
              onImageClick={handleImageClick}
              allPoseItems={allPoseItems}
            />
          )}
          {activeTab === 'favorites' && (
            <FavoritesPage
              favs={favs}
              onToggleFav={handleToggleFav}
              onImageClick={handleImageClick}
              allPoseItems={allPoseItems}
            />
          )}

          <nav className="bottom-nav">
            <button
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-label">首页</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'random' ? 'active' : ''}`}
              onClick={() => setActiveTab('random')}
            >
              <span className="nav-icon">🎲</span>
              <span className="nav-label">随机</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <span className="nav-icon">{favs.length > 0 ? '❤️' : '🤍'}</span>
              <span className="nav-label">收藏</span>
            </button>
          </nav>
        </>
      )}

      <ImageViewer
        images={viewerState.images}
        initialIndex={viewerState.index}
        categoryName={viewerState.name}
        onClose={handleCloseViewer}
        onDelete={handleDeleteFromViewer}
        canDelete={viewerState.canDelete}
      />

      <NewCategoryModal
        visible={showNewCatModal}
        onClose={() => setShowNewCatModal(false)}
        onCreate={handleCreateCategory}
      />

      <ConfirmModal
        visible={showDeleteImgConfirm.visible}
        title="删除照片"
        message="确定要删除这张照片吗？此操作不可恢复。"
        confirmText="删除"
        cancelText="取消"
        danger={true}
        onConfirm={confirmDeleteImage}
        onCancel={() => setShowDeleteImgConfirm({ visible: false, categoryId: null, imageIndex: -1 })}
      />

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
};

function announceUpgrade() {
  window.parent.postMessage({ type: 'miaoda:upgrade:available', kind: 'interactive-prototype' }, '*');
}
announceUpgrade();
if (document.readyState !== 'complete') {
  window.addEventListener('load', announceUpgrade, { once: true });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
