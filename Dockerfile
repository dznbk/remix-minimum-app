# =================================================
# 1) ビルドステージ
# =================================================
FROM node:22-alpine AS builder

# 作業ディレクトリの設定
WORKDIR /app

# package*.json を先にコピー（依存関係のインストールキャッシュを有効にするため）
COPY package*.json ./

# 依存関係インストール
RUN npm install

# ソースコードをコピー
COPY . .

# ビルドコマンド
# 例: npm run build → 「remix vite:build」が動き、server/index.ts も esbuild される想定
RUN npm run build


# =================================================
# 2) ランタイムステージ
# =================================================
FROM node:22-alpine AS runner

# 環境変数: 本番用に NODE_ENV=production を設定
ENV NODE_ENV=production

WORKDIR /app

# 実行に最低限必要なファイルをコピー
# (node_modules はビルドステージからそのままコピー)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Remix ビルド成果物やサーバーサイドのビルド出力
COPY --from=builder /app/build ./build

# ポート公開 (Expressが3000で起動する場合)
EXPOSE 3000

# 本番起動コマンド
# package.json の "start" スクリプトを呼ぶ（例: cross-env NODE_ENV=production node ./build/server/index.js）
CMD ["npm", "run", "start"]
