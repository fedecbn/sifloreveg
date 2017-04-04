from fabric.api import *
from fabric.colors import green

env.hosts = ['demo-masao.eu']
env.app_path = '~/fcbn/'
env.environment = 'preprod'

def prod():
    """Activation de l'environement de production"""
    env.hosts = ['fcbn@siflore.fcbn.fr:10022']
    env.app_path = '~/fcbn/'
    env.environment = 'prod'

def commit():
    """Creation d'un commit (une modification)"""
    print(green("Commit last modifs..."))
    local('git add -A && git commit')

def colstat():
    """Rafraichissement du cache serveur pour les assets"""
    print(green("Prod Collecting Static Files..."))
    with cd(env.app_path):
        run('php app/console assets:install web --symlink')
        if env.environment == 'prod':
            run('php app/console assetic:dump --env=%s' % (env.environment))

def cacheclear():
    """Rafraichissement du cache server pour les templates"""
    print(green("Prod Clearing Cache..."))
    with cd(env.app_path):
        run('php app/console cache:clear --env=%s' % (env.environment))
#        sudo('php app/console cache:clear --env=%s' % (env.environment)
#          , user='www-data'
#        )

def pull():
    """Recuperation de la derniere version"""
    with cd(env.app_path):
        print(green("Pulling from server..."))
        run('git pull origin master')
    cacheclear()

def pushpull():
    """Envoi des derniers commits vers le repository de reference et recuperation sur le serveur"""
    print(green("Pushing to the ref..."))
    local('git push')
    pull()

def deploy():
    """Mise a jour du code et rafraichissement du cache"""
    pushpull()
    colstat()

def reset():
    """Annulation des modifications non commitees"""
    print(green("Rolling back the Prod Repository..."))
    with cd(env.app_path):
        run('git reset --hard')

