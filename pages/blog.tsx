const Blog = () => 
<>
    <div className="relative bg-gray-50 pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
  <div className="absolute inset-0">
    <div className="bg-white h-1/3 sm:h-2/3"></div>
  </div>
  <div className="relative max-w-7xl mx-auto">
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover cursor-pointer" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixqx=01sdm8Ow9O&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt=""/>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href="#" className="hover:underline">
                Article
              </a>
            </p>
            <a href="#" className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                Boost your conversion rate
              </p>
              <p className="mt-3 text-base text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover cursor-pointer" src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixqx=01sdm8Ow9O&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt=""/>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href="#" className="hover:underline">
                Video
              </a>
            </p>
            <a href="#" className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                How to use search engine optimization to drive sales
              </p>
              <p className="mt-3 text-base text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.
              </p>
            </a>
          </div>      
        </div>
      </div>

      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div className="flex-shrink-0">
          <img className="h-48 w-full object-cover cursor-pointer" src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixqx=01sdm8Ow9O&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt=""/>
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href="#" className="hover:underline">
                Case Study
              </a>
            </p>
            <a href="#" className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">
                Improve your customer experience
              </p>
              <p className="mt-3 text-base text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>

export default Blog;
