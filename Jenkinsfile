 
    agent any
    
    environment {
        REMOTE_HOST = '43.142.19.211'
        REMOTE_USER = 'root'
        REMOTE_PORT = '22'
        REMOTE_PATH = '/www/server/web/blog/'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                sh """
                    scp -o StrictHostKeyChecking=no -P ${REMOTE_PORT} -r docs/.vitepress/dist/* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
                """
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}