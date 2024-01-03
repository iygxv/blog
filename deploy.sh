
# 防止不更新
ssh root@43.139.47.204 "rm -rf /www/server/web/blob/*"

scp -P 22 -r docs/.vitepress/dist/* root@43.139.47.204:/www/server/web/blob/


