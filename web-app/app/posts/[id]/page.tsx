"use client";

import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/student/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, ArrowLeft, FileText, Download, Bookmark, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { toast } from 'sonner';

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [postData, setPostData] = useState<any>(null);

  useEffect(() => {
    // Tìm bài viết dựa vào id từ params
    const post = posts.find(p => p.id === parseInt(params.id));
    setPostData(post);
  }, [params.id]);

  if (!postData) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-muted-foreground">Không tìm thấy bài viết</p>
        </div>
      </StudentLayout>
    );
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Đã bỏ lưu bài viết' : 'Đã lưu bài viết');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: postData.title,
        text: postData.description,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback khi không hỗ trợ Web Share API
      toast.error('Không thể chia sẻ bài viết');
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/posts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{postData.title}</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {postData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardDescription className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {postData.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                Hoạt động: {postData.activityTitle}
              </div>
              <div className="text-sm text-muted-foreground">
                Tác giả: {postData.author}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBookmark}
                className={isBookmarked ? 'text-primary' : ''}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            {postData.fileUrl && (
              <Button asChild>
                <Link href={postData.fileUrl} target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Tải tài liệu
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </StudentLayout>
  );
}

  // Mock data for posts
  const posts = [
    {
      id: 1,
      title: 'Tài liệu giới thiệu về AI và Machine Learning',
      date: '10/01/2025',
      activityId: 1,
      activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      author: 'PGS. TS. Nguyễn Thanh Tùng',
      description: 'Tài liệu giới thiệu các khái niệm cơ bản về AI và Machine Learning, cũng như các ứng dụng thực tế.',
      tags: ['AI', 'Machine Learning', 'Tài liệu'],
      content: `
        <h2>Giới thiệu về Trí tuệ nhân tạo và Machine Learning</h2>
        <p>Trí tuệ nhân tạo (AI) và Machine Learning đang thay đổi cách chúng ta tương tác với công nghệ và giải quyết các vấn đề phức tạp. Tài liệu này giới thiệu các khái niệm cơ bản về AI và Machine Learning, cũng như các ứng dụng thực tế của chúng trong nhiều lĩnh vực khác nhau.</p>
        
        <h3>Trí tuệ nhân tạo là gì?</h3>
        <p>Trí tuệ nhân tạo (AI) là một nhánh của khoa học máy tính tập trung vào việc tạo ra các hệ thống có khả năng thực hiện các nhiệm vụ thường đòi hỏi trí thông minh của con người. Các nhiệm vụ này bao gồm nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên, ra quyết định và giải quyết vấn đề.</p>
        
        <h3>Machine Learning là gì?</h3>
        <p>Machine Learning là một phương pháp của AI cho phép máy tính học từ dữ liệu mà không cần được lập trình một cách rõ ràng. Thay vì viết mã để thực hiện một nhiệm vụ cụ thể, chúng ta cung cấp dữ liệu cho thuật toán và cho phép nó tự học cách thực hiện nhiệm vụ đó.</p>
        
        <h3>Các loại Machine Learning</h3>
        <ul>
          <li><strong>Học có giám sát (Supervised Learning):</strong> Mô hình được huấn luyện trên dữ liệu đã được gán nhãn, với mục tiêu là dự đoán nhãn cho dữ liệu mới.</li>
          <li><strong>Học không giám sát (Unsupervised Learning):</strong> Mô hình được huấn luyện trên dữ liệu không có nhãn, với mục tiêu là tìm ra cấu trúc hoặc mẫu trong dữ liệu.</li>
          <li><strong>Học tăng cường (Reinforcement Learning):</strong> Mô hình học cách thực hiện hành động trong một môi trường để tối đa hóa phần thưởng.</li>
        </ul>
        
        <h3>Ứng dụng của AI và Machine Learning</h3>
        <p>AI và Machine Learning đang được ứng dụng trong nhiều lĩnh vực khác nhau, bao gồm:</p>
        <ul>
          <li>Y tế: Chẩn đoán bệnh, phát hiện ung thư, phát triển thuốc</li>
          <li>Tài chính: Phát hiện gian lận, giao dịch tự động, đánh giá rủi ro</li>
          <li>Bán lẻ: Hệ thống đề xuất, dự đoán nhu cầu, tối ưu hóa chuỗi cung ứng</li>
          <li>Giao thông: Xe tự lái, tối ưu hóa lộ trình, dự đoán tắc nghẽn</li>
          <li>Sản xuất: Bảo trì dự đoán, kiểm soát chất lượng, tự động hóa</li>
        </ul>
        
        <h3>Thách thức và xu hướng trong tương lai</h3>
        <p>Mặc dù AI và Machine Learning đã đạt được những tiến bộ đáng kể, nhưng vẫn còn nhiều thách thức cần giải quyết, bao gồm:</p>
        <ul>
          <li>Đạo đức và quyền riêng tư: Làm thế nào để đảm bảo AI được sử dụng một cách có đạo đức và tôn trọng quyền riêng tư của người dùng?</li>
          <li>Giải thích được: Làm thế nào để hiểu và giải thích các quyết định của mô hình AI phức tạp?</li>
          <li>Thiên kiến và công bằng: Làm thế nào để đảm bảo AI không kế thừa hoặc khuếch đại các thiên kiến trong dữ liệu?</li>
        </ul>
        
        <p>Trong tương lai, chúng ta có thể mong đợi sự phát triển của AI tổng quát hơn, có khả năng thực hiện nhiều nhiệm vụ khác nhau và thích ứng với các tình huống mới. Chúng ta cũng có thể thấy sự tích hợp sâu hơn của AI vào cuộc sống hàng ngày, từ nhà thông minh đến trợ lý ảo cá nhân.</p>
      `,
      fileUrl: '/files/ai-machine-learning-intro.pdf'
    },
    {
      id: 2,
      title: 'Hướng dẫn thực hành Machine Learning cơ bản',
      date: '12/01/2025',
      activityId: 1,
      activityTitle: 'Hội thảo Trí tuệ nhân tạo và Machine Learning',
      author: 'TS. Lê Văn Minh',
      description: 'Hướng dẫn thực hành các thuật toán Machine Learning cơ bản và cách triển khai chúng.',
      tags: ['AI', 'Machine Learning', 'Thực hành'],
      content: `
        <h2>Hướng dẫn thực hành Machine Learning cơ bản</h2>
        <p>Tài liệu này cung cấp hướng dẫn thực hành về cách triển khai các thuật toán Machine Learning cơ bản. Chúng tôi sẽ sử dụng Python và các thư viện phổ biến như NumPy, Pandas, Scikit-learn và TensorFlow.</p>
        
        <h3>Chuẩn bị môi trường</h3>
        <p>Trước khi bắt đầu, bạn cần cài đặt các thư viện sau:</p>
        <pre><code>pip install numpy pandas scikit-learn matplotlib tensorflow</code></pre>
        
        <h3>Bài thực hành 1: Phân loại với thuật toán K-Nearest Neighbors</h3>
        <p>Trong bài thực hành này, chúng ta sẽ sử dụng thuật toán K-Nearest Neighbors (K-NN) để phân loại hoa Iris dựa trên các đặc điểm của chúng.</p>
        <pre><code>import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# Load dữ liệu
iris = load_iris()
X = iris.data
y = iris.target

# Chia dữ liệu thành tập huấn luyện và tập kiểm tra
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Huấn luyện mô hình
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Dự đoán
y_pred = knn.predict(X_test)

# Đánh giá mô hình
accuracy = accuracy_score(y_test, y_pred)
print(f'Độ chính xác: {accuracy:.2f}')</code></pre>
        
        <h3>Bài thực hành 2: Hồi quy tuyến tính</h3>
        <p>Trong bài thực hành này, chúng ta sẽ sử dụng hồi quy tuyến tính để dự đoán giá nhà dựa trên các đặc điểm của chúng.</p>
        <pre><code>import numpy as np
import pandas as pd
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Load dữ liệu
boston = load_boston()
X = boston.data
y = boston.target

# Chia dữ liệu thành tập huấn luyện và tập kiểm tra
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Huấn luyện mô hình
model = LinearRegression()
model.fit(X_train, y_train)

# Dự đoán
y_pred = model.predict(X_test)

# Đánh giá mô hình
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse:.2f}')</code></pre>
        
        <h3>Bài thực hành 3: Phân cụm với K-Means</h3>
        <p>Trong bài thực hành này, chúng ta sẽ sử dụng thuật toán K-Means để phân cụm dữ liệu.</p>
        <pre><code>import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# Tạo dữ liệu mẫu
X, y = make_blobs(n_samples=300, centers=4, random_state=42)

# Huấn luyện mô hình
kmeans = KMeans(n_clusters=4, random_state=42)
kmeans.fit(X)

# Dự đoán cụm cho mỗi điểm dữ liệu
y_pred = kmeans.predict(X)

# Trực quan hóa kết quả
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=y_pred)
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c='red', marker='X')
plt.title('K-Means Clustering')
plt.show()</code></pre>
        
        <h3>Bài thực hành 4: Mạng neural đơn giản với TensorFlow</h3>
        <p>Trong bài thực hành này, chúng ta sẽ xây dựng một mạng neural đơn giản để phân loại chữ số viết tay từ bộ dữ liệu MNIST.</p>
        <pre><code>import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.utils import to_categorical

# Load dữ liệu
(X_train, y_train), (X_test, y_test) = mnist.load_data()

# Tiền xử lý dữ liệu
X_train = X_train / 255.0
X_test = X_test / 255.0
y_train = to_categorical(y_train)
y_test = to_categorical(y_test)

# Xây dựng mô hình
model = Sequential([
    Flatten(input_shape=(28, 28)),
    Dense(128, activation='relu'),
    Dense(64, activation='relu'),
    Dense(10, activation='softmax')
])

# Biên dịch mô hình
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Huấn luyện mô hình
model.fit(X_train, y_train, epochs=5, batch_size=32, validation_split=0.2)

# Đánh giá mô hình
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f'Độ chính xác trên tập kiểm tra: {test_acc:.2f}')</code></pre>
        
        <h3>Kết luận</h3>
        <p>Trong tài liệu này, chúng ta đã thực hành các thuật toán Machine Learning cơ bản, bao gồm phân loại, hồi quy, phân cụm và mạng neural. Đây chỉ là những ví dụ đơn giản để giúp bạn bắt đầu. Để hiểu sâu hơn về Machine Learning, bạn nên tiếp tục học và thực hành với các bộ dữ liệu và vấn đề phức tạp hơn.</p>
      `,
      fileUrl: '/files/machine-learning-practice.pdf'
    },
    {
      id: 3,
      title: 'Giới thiệu về Blockchain và ứng dụng',
      date: '20/02/2025',
      activityId: 2,
      activityTitle: 'Hội thảo Blockchain và Tiền mã hóa',
      author: 'TS. Lê Văn Minh',
      description: 'Tài liệu giới thiệu về công nghệ Blockchain và các ứng dụng trong thực tế.',
      tags: ['Blockchain', 'Tài liệu'],
      content: `
        <h2>Giới thiệu về Blockchain và ứng dụng</h2>
        <p>Blockchain là một công nghệ sổ cái phân tán, cho phép lưu trữ dữ liệu một cách an toàn, minh bạch và không thể thay đổi. Tài liệu này giới thiệu về công nghệ Blockchain và các ứng dụng của nó trong thực tế.</p>
        
        <h3>Blockchain là gì?</h3>
        <p>Blockchain là một cơ sở dữ liệu phân tán, lưu trữ thông tin trong các khối (blocks) được liên kết với nhau bằng mã hóa. Mỗi khối chứa một số lượng giao dịch nhất định, và một khi được thêm vào chuỗi, thông tin trong khối không thể bị thay đổi mà không làm thay đổi tất cả các khối sau đó.</p>
        
        <h3>Các đặc điểm chính của Blockchain</h3>
        <ul>
          <li><strong>Phân tán:</strong> Dữ liệu được lưu trữ trên nhiều máy tính (nodes) trong mạng, không có điểm kiểm soát trung tâm.</li>
          <li><strong>Minh bạch:</strong> Tất cả các giao dịch đều có thể được xem bởi bất kỳ ai trong mạng.</li>
          <li><strong>Không thể thay đổi:</strong> Một khi dữ liệu đã được thêm vào blockchain, nó không thể bị thay đổi hoặc xóa.</li>
          <li><strong>Bảo mật:</strong> Sử dụng mã hóa để bảo vệ dữ liệu và xác thực giao dịch.</li>
          <li><strong>Đồng thuận:</strong> Các nodes trong mạng phải đồng ý về trạng thái của blockchain.</li>
        </ul>
        
        <h3>Các loại Blockchain</h3>
        <ul>
          <li><strong>Blockchain công khai (Public Blockchain):</strong> Bất kỳ ai cũng có thể tham gia và xác thực giao dịch. Ví dụ: Bitcoin, Ethereum.</li>
          <li><strong>Blockchain riêng tư (Private Blockchain):</strong> Chỉ những người được mời mới có thể tham gia. Thường được sử dụng trong doanh nghiệp.</li>
          <li><strong>Blockchain liên hợp (Consortium Blockchain):</strong> Được kiểm soát bởi một nhóm các tổ chức.</li>
        </ul>
        
        <h3>Ứng dụng của Blockchain</h3>
        <p>Blockchain đang được ứng dụng trong nhiều lĩnh vực khác nhau, bao gồm:</p>
        <ul>
          <li><strong>Tiền mã hóa:</strong> Bitcoin, Ethereum, và hàng nghìn loại tiền mã hóa khác.</li>
          <li><strong>Hợp đồng thông minh (Smart Contracts):</strong> Các hợp đồng tự thực thi khi các điều kiện được đáp ứng.</li>
          <li><strong>Chuỗi cung ứng:</strong> Theo dõi sản phẩm từ nguồn gốc đến người tiêu dùng.</li>
          <li><strong>Y tế:</strong> Lưu trữ và chia sẻ hồ sơ y tế một cách an toàn.</li>
          <li><strong>Bỏ phiếu điện tử:</strong> Đảm bảo tính minh bạch và không thể thay đổi của kết quả bầu cử.</li>
          <li><strong>Bất động sản:</strong> Lưu trữ và xác minh quyền sở hữu tài sản.</li>
          <li><strong>Bảo hiểm:</strong> Tự động hóa quy trình yêu cầu bồi thường và giảm gian lận.</li>
        </ul>
        
        <h3>Thách thức và hạn chế</h3>
        <p>Mặc dù có nhiều ưu điểm, blockchain vẫn phải đối mặt với một số thách thức:</p>
        <ul>
          <li><strong>Khả năng mở rộng:</strong> Một số blockchain có thể xử lý số lượng giao dịch hạn chế.</li>
          <li><strong>Tiêu thụ năng lượng:</strong> Một số cơ chế Đồng thuận (như Proof of Work) tiêu thụ nhiều năng lượng.</li>
          <li><strong>Quy định pháp lý:</strong> Thiếu khung pháp lý rõ ràng cho các ứng dụng blockchain.</li>
          <li><strong>Tích hợp:</strong> Khó khăn trong việc tích hợp với các hệ thống hiện có.</li>
        </ul>
        
        <h3>Tương lai của Blockchain</h3>
        <p>Trong tương lai, chúng ta có thể mong đợi:</p>
        <ul>
          <li>Sự phát triển của các giải pháp khả năng mở rộng.</li>
          <li>Sự chấp nhận rộng rãi hơn của blockchain trong các ngành công nghiệp truyền thống.</li>
          <li>Sự phát triển của các cơ chế đồng thuận tiết kiệm năng lượng hơn.</li>
          <li>Sự tích hợp của blockchain với các công nghệ khác như AI và IoT.</li>
        </ul>
        
        <p>Blockchain là một công nghệ đầy hứa hẹn với tiềm năng thay đổi cách chúng ta lưu trữ và trao đổi giá trị. Tuy nhiên, để đạt được tiềm năng đầy đủ của nó, chúng ta cần giải quyết các thách thức hiện tại và phát triển các ứng dụng</p>
      `,
      fileUrl: '/files/blockchain-introduction.pdf'
    }
  ];

