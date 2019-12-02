git checkout develop
Write-Output 'develop branch'

git add .
Write-Output 'add all done'

git commit -m "d"
Write-Output 'commit success'

git checkout master
Write-Output 'master branch'

git merge develop
Write-Output 'merge develop'

git pull
Write-Output 'all up date'

git push
Write-Output 'push origin'

git checkout develop
Write-Output 'develop branch'

git merge master
Write-Output 'merge master'



