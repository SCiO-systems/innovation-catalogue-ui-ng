def subject_content = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER}"
def body_content = '${JELLY_SCRIPT,template="html"}'
def stage_tag = 'dev'
def project_name = 'innovation-catalogue-ui-ng'
def deployment_instance = 'innovation.dev.scio.services'


pipeline {
    agent any

    stages {
        stage('Fetching SCM repo') {
            steps {
                echo 'Fetching SCM repo'

                script {
                    checkout scm
                    sh 'git rev-parse --short HEAD > .git/commit-id'
                    commit_id = readFile('.git/commit-id').trim()
                }
            }
        }

        stage('Building & pushing docker images to DockerHub') {
            steps {
                    echo 'Building project'

                    script {
                        
                        echo 'Downloading from S3 bucket'
                        withAWS(region: 'us-east-2', credentials:'jenkins-aws') {
                            s3Download(file: '.env', bucket: 'scio-project-envs', path: "reactjs/${project_name}/${stage_tag}.env", force:true)
                            s3Download(file: '.npmrc', bucket: 'scio-project-envs', path: "reactjs/fontawesome_npmrc", force:true)
                        }

                        docker.withRegistry('https://index.docker.io/v1/', 'DockerHub') {
                            docker.build("sciohub/${project_name}:${stage_tag}", ".").push()
                        }
                    }
            }
        }

        stage('Deploying stage') {
            steps {
                echo "Deploying to ${stage_name} environment"

                script {
                    sshagent(credentials: ['jenkins-ssh-key']) {
                        sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${deployment_instance} sudo mkdir -p /var/lib/${project_name}-${stage_tag}"
                        sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${deployment_instance} sudo chown -R scio:scio /var/lib/${project_name}-${stage_tag}"
                        sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${deployment_instance} docker rm -f ${project_name}" // stop container if already running under the defined container name
                        sh "scp -P 1412 -o StrictHostKeyChecking=no docker-compose.${stage_tag}.yml scio@${deployment_instance}:/var/lib/${project_name}-${stage_tag}"
                        sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${deployment_instance} docker-compose -f /var/lib/${project_name}-${stage_tag}/docker-compose.${stage_tag}.yml pull"
                        sh "ssh -p1412 -o StrictHostKeyChecking=no scio@${deployment_instance} docker-compose -f /var/lib/${project_name}-${stage_tag}/docker-compose.${stage_tag}.yml up -d"
                    }
                }
        }
    }
}

    // Cleaning Jenkins workspace
    post {
        always {
            sh 'docker image prune -a -f' // remove built images
            emailext(body: body_content, mimeType: 'text/html',
            replyTo: '$DEFAULT_REPLYTO', subject: subject_content,
            to: 'dev@scio.systems', attachLog: true)

            cleanWs()
        }
    }
}
