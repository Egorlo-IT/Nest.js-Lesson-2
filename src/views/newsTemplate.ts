import { News } from '../news/news.interface';
export const newsTemplate = (news: News[]) => {
  if (news?.length === 0) {
    return emptyNews();
  }
  let html = `
    <h1 class="text-uppercase mb-5">Новости</h1><div class="row">
  `;
  for (const newsItem of news) {
    html += `
      <div class="col-lg-6 mb-3">
        <div class="card align-items-center">
          <div class="card-body">
            <h5 class="card-title">${newsItem.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">  
              Автор: ${newsItem.author}
            </h6>
            <h6 class="card-subtitle mb-2 text-muted">
              Дата создания: ${newsItem.createdAt.toLocaleString()}
            </h6>
            <p class="card-text">${newsItem.description}</p>
          </div>
          <a href="http://localhost:3000/news/${newsItem.id}/detail">
            <button type="button" class="btn btn-dark mb-4">
              Читать далее
            </button>
          </a>
        </div>
      </div>
    `;
  }
  html += '</div>';
  return html;
};
const emptyNews = () => {
  return `
    <h1 class="text-uppercase">Новости</h1>
    <h4 class="text-secondary">Список новостей пуст!</h4>
  `;
};
